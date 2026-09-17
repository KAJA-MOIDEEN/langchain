"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVectorStore = createVectorStore;
const pgvector_1 = require("@langchain/community/vectorstores/pgvector");
const embedding_service_1 = require("../embeddings/embedding.service");
const env_1 = require("../config/env");
async function createVectorStore() {
    try {
        const vectorStore = await pgvector_1.PGVectorStore.initialize(embedding_service_1.embeddings, {
            postgresConnectionOptions: {
                connectionString: env_1.env.SUPABASE_DATABASE_URL,
            },
            tableName: "documents",
            columns: {
                idColumnName: "id",
                vectorColumnName: "embedding",
                contentColumnName: "content",
                metadataColumnName: "metadata",
            },
        });
        return vectorStore;
    }
    catch (error) {
        const message = error?.message?.includes("getaddrinfo") || error?.code === "ENOTFOUND"
            ? "Supabase database host is unreachable or the SUPABASE_DATABASE_URL is invalid. Check your Supabase project URL and connection details."
            : error?.message || "Failed to connect to the vector database.";
        throw new Error(message);
    }
}
