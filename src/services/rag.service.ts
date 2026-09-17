import { loadPDF } from "../loaders/document.loader";
import { splitDocuments } from "./document.service";
import { createVectorStore } from "../vectorstore/pgvector.store";

export async function ingestDocument(filePath: string) {
  const documents = await loadPDF(filePath);
  return addDocumentsToVectorStore(documents);
}

export async function ingestPdf(file: Blob, fileName: string) {
  const documents = await loadPDF(file);

  for (const document of documents) {
    document.metadata = { ...document.metadata, source: fileName };
  }

  return addDocumentsToVectorStore(documents);
}

async function addDocumentsToVectorStore(documents: any[]) {
  const chunks = await splitDocuments(documents);
  const vectorStore = await createVectorStore();
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
