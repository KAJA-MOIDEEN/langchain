"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.llm = void 0;
const openai_1 = require("@langchain/openai");
const env_1 = require("./env");
exports.llm = new openai_1.ChatOpenAI({
    apiKey: env_1.env.OPENAI_API_KEY,
    configuration: {
        baseURL: env_1.env.OPENAI_BASE_URL,
    },
    model: "openai/gpt-4o-mini",
    temperature: 0,
});
