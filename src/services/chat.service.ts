import { createRAGChain } from "../chains/rag.chain";

export async function askQuestion(question: string) {
  const chain = await createRAGChain();

  const answer = await chain.invoke({
    question,
  });

  return answer;
}