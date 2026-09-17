"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ragPrompt = void 0;
const prompts_1 = require("@langchain/core/prompts");
exports.ragPrompt = prompts_1.ChatPromptTemplate.fromMessages([
    [
        "system",
        `
You are a helpful AI assistant.

Answer the user's question using ONLY the provided context.

If the answer cannot be found in the context, say:
"I don't have enough information in the provided documents."

Do not invent information.

Context:
{context}
`,
    ],
    [
        "human",
        "{question}",
    ],
]);
