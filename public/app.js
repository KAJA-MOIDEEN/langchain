const form = document.querySelector("#chat-form");
const question = document.querySelector("#question");
const messages = document.querySelector("#messages");
const sendButton = document.querySelector("#send-button");
const fileInput = document.querySelector("#document-file");
const uploadStatus = document.querySelector("#upload-status");

function addMessage(text, role) {
  const article = document.createElement("article");
  article.className = `message ${role}-message`;

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.setAttribute("aria-hidden", "true");
  avatar.textContent = role === "assistant" ? "AI" : "You";

  const content = document.createElement("p");
  content.textContent = text;
  article.append(avatar, content);
  messages.append(article);
  messages.scrollTop = messages.scrollHeight;
  return article;
}

function resizeInput() {
  question.style.height = "auto";
  question.style.height = `${Math.min(question.scrollHeight, 150)}px`;
}

question.addEventListener("input", resizeInput);
question.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    form.requestSubmit();
  }
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const text = question.value.trim();
  if (!text) return;

  addMessage(text, "user");
  question.value = "";
  resizeInput();
  sendButton.disabled = true;

  const loading = addMessage("Thinking…", "assistant");
  loading.classList.add("typing");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: text }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "The request could not be completed.");
    }

    loading.remove();
    addMessage(data.answer, "assistant");
  } catch (error) {
    loading.remove();
    addMessage(`Sorry, ${error.message}`, "assistant");
  } finally {
    sendButton.disabled = false;
    question.focus();
  }
});

fileInput.addEventListener("change", async () => {
  const [file] = fileInput.files;
  if (!file) return;

  if (!file.name.toLowerCase().endsWith(".pdf")) {
    uploadStatus.textContent = "Please select a PDF file.";
    uploadStatus.className = "upload-status error";
    fileInput.value = "";
    return;
  }

  uploadStatus.className = "upload-status";
  uploadStatus.textContent = `Uploading ${file.name}…`;

  try {
    const response = await fetch("/api/documents", {
      method: "POST",
      headers: {
        "Content-Type": "application/pdf",
        "X-File-Name": file.name,
      },
      body: file,
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Upload failed.");

    uploadStatus.textContent = `${file.name} is ready — ${data.chunks} chunks indexed.`;
    addMessage(`I've indexed ${file.name}. You can ask me about it now.`, "assistant");
  } catch (error) {
    uploadStatus.textContent = error.message;
    uploadStatus.className = "upload-status error";
  } finally {
    fileInput.value = "";
  }
});
