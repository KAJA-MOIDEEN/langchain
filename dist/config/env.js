"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv/config");
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    OPENAI_API_KEY: zod_1.z.string().min(1),
    OPENAI_BASE_URL: zod_1.z
        .string()
        .url()
        .default("https://api.openai.com/v1"),
    PORT: zod_1.z.coerce.number().default(5000),
    SUPABASE_DATABASE_URL: zod_1.z.string().url(),
});
exports.env = envSchema.parse(process.env);
