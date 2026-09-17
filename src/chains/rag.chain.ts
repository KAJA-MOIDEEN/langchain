import { RunnablePassthrough } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";

import { llm } from "../config/llm";
import { ragPrompt } from "../prompts/rag.prompt";
import { createVectorStore } from "../vectorstore/pgvector.store";

function formatDocuments(docs: any[]) {
  return docs
    .map((doc) => doc.pageContent)
    .join("\n\n");
}

export async function createRAGChain() {
  const vectorStore = await createVectorStore();

  const retriever = vectorStore.asRetriever({
    k: 5,
  });

  const chain = RunnablePassthrough.assign({
    context: async (input: { question: string }) => {
      const docs = await retriever.invoke(input.question);

      return formatDocuments(docs);
    },
  })
    .pipe(ragPrompt)
    .pipe(llm)
    .pipe(new StringOutputParser());

  return chain;
}