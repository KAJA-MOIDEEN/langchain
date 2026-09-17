"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.embeddings = void 0;
const openai_1 = require("@langchain/openai");
const env_1 = require("../config/env");
exports.embeddings = new openai_1.OpenAIEmbeddings({
    apiKey: env_1.env.OPENAI_API_KEY,
    configuration: {
        baseURL: env_1.env.OPENAI_BASE_URL,
    },
    model: "openai/text-embedding-3-small",
});
