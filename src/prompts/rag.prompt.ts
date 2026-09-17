import { ChatPromptTemplate } from "@langchain/core/prompts";

export const ragPrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `
You are a helpful AI assistant.

Answer the user's question using ONLY the provided context.

If the answer cannot be found in the context, say:
"I don't have enough information in the provided documents."

Do not invent information.

Context:
{context}
`,
  ],

  [
    "human",
    "{question}",
  ],
]);