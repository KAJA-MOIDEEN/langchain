"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.askQuestion = askQuestion;
const rag_chain_1 = require("../chains/rag.chain");
async function askQuestion(question) {
    const chain = await (0, rag_chain_1.createRAGChain)();
    const answer = await chain.invoke({
        question,
    });
    return answer;
}
