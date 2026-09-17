import { PGVectorStore } from "@langchain/community/vectorstores/pgvector";
import { embeddings } from "../embeddings/embedding.service";
import { env } from "../config/env";

export async function createVectorStore() {
  try {
    const vectorStore = await PGVectorStore.initialize(
      embeddings,
      {
        postgresConnectionOptions: {
          connectionString: env.SUPABASE_DATABASE_URL,
        },

        tableName: "documents",

        columns: {
          idColumnName: "id",
          vectorColumnName: "embedding",
          contentColumnName: "content",
          metadataColumnName: "metadata",
        },
      }
    );

    return vectorStore;
  } catch (error: any) {
    const message =
      error?.message?.includes("getaddrinfo") || error?.code === "ENOTFOUND"
        ? "Supabase database host is unreachable or the SUPABASE_DATABASE_URL is invalid. Check your Supabase project URL and connection details."
        : error?.message || "Failed to connect to the vector database.";

    throw new Error(message);
  }
}