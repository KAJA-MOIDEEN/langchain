import { OpenAIEmbeddings } from "@langchain/openai";
import { env } from "../config/env";

export const embeddings = new OpenAIEmbeddings({
  apiKey: env.OPENAI_API_KEY,
  configuration: {
    baseURL: env.OPENAI_BASE_URL,
  },
  model: "openai/text-embedding-3-small",
});