"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRAGChain = createRAGChain;
const runnables_1 = require("@langchain/core/runnables");
const output_parsers_1 = require("@langchain/core/output_parsers");
const llm_1 = require("../config/llm");
const rag_prompt_1 = require("../prompts/rag.prompt");
const pgvector_store_1 = require("../vectorstore/pgvector.store");
function formatDocuments(docs) {
    return docs
        .map((doc) => doc.pageContent)
        .join("\n\n");
}
async function createRAGChain() {
    const vectorStore = await (0, pgvector_store_1.createVectorStore)();
    const retriever = vectorStore.asRetriever({
        k: 5,
    });
    const chain = runnables_1.RunnablePassthrough.assign({
        context: async (input) => {
            const docs = await retriever.invoke(input.question);
            return formatDocuments(docs);
        },
    })
        .pipe(rag_prompt_1.ragPrompt)
        .pipe(llm_1.llm)
        .pipe(new output_parsers_1.StringOutputParser());
    return chain;
}
