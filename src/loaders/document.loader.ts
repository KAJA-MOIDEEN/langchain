import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export async function loadPDF(filePathOrBlob: string | Blob) {
  const loader = new PDFLoader(filePathOrBlob);

  const documents = await loader.load();

  return documents;
}
