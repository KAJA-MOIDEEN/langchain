"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadPDF = loadPDF;
const pdf_1 = require("@langchain/community/document_loaders/fs/pdf");
async function loadPDF(filePath) {
    const loader = new pdf_1.PDFLoader(filePath);
    const documents = await loader.load();
    return documents;
}
