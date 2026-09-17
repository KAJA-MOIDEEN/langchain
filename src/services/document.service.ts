import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export async function splitDocuments(documents: any[]) {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  return splitter.splitDocuments(documents);
}