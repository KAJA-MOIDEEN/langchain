import { loadPDF } from "../loaders/document.loader";
import { splitDocuments } from "./document.service";
import { createVectorStore } from "../vectorstore/pgvector.store";

export async function ingestDocument(filePath: string) {
  // 1. Load document
  const documents = await loadPDF(filePath);

  // 2. Split into chunks
  const chunks = await splitDocuments(documents);

  // 3. Create vector store
  const vectorStore = await createVectorStore();

  // 4. Store embeddings
  await vectorStore.addDocuments(chunks);

  return {
    documents: documents.length,
    chunks: chunks.length,
  };
}

export async function retrieveDocuments(question: string) {
  const vectorStore = await createVectorStore();

  const retriever = vectorStore.asRetriever({
    k: 5,
  });

  const documents = await retriever.invoke(question);

  return documents;
}