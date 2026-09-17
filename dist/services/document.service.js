"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitDocuments = splitDocuments;
const textsplitters_1 = require("@langchain/textsplitters");
async function splitDocuments(documents) {
    const splitter = new textsplitters_1.RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
    });
    return splitter.splitDocuments(documents);
}
