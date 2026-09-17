import { ChatOpenAI } from "@langchain/openai";
import { env } from "./env";

export const llm = new ChatOpenAI({
  apiKey: env.OPENAI_API_KEY,
  configuration: {
    baseURL: env.OPENAI_BASE_URL,
  },
  model: "openai/gpt-4o-mini",
  temperature: 0,
});