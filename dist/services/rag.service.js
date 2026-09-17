"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ingestDocument = ingestDocument;
exports.retrieveDocuments = retrieveDocuments;
const document_loader_1 = require("../loaders/document.loader");
const document_service_1 = require("./document.service");
const pgvector_store_1 = require("../vectorstore/pgvector.store");
async function ingestDocument(filePath) {
    // 1. Load document
    const documents = await (0, document_loader_1.loadPDF)(filePath);
    // 2. Split into chunks
    const chunks = await (0, document_service_1.splitDocuments)(documents);
    // 3. Create vector store
    const vectorStore = await (0, pgvector_store_1.createVectorStore)();
    // 4. Store embeddings
    await vectorStore.addDocuments(chunks);
    return {
        documents: documents.length,
        chunks: chunks.length,
    };
}
async function retrieveDocuments(question) {
    const vectorStore = await (0, pgvector_store_1.createVectorStore)();
    const retriever = vectorStore.asRetriever({
        k: 5,
    });
    const documents = await retriever.invoke(question);
    return documents;
}
