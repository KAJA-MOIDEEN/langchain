"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatController = chatController;
const zod_1 = require("zod");
const chat_service_1 = require("../services/chat.service");
const chatSchema = zod_1.z.object({
    question: zod_1.z
        .string()
        .trim()
        .min(1)
        .max(2000),
});
function normalizeQuestionPayload(req) {
    if (typeof req.body === "string") {
        return { question: req.body };
    }
    if (typeof req.body === "object" && req.body !== null) {
        const { question, message, input, query } = req.body;
        return {
            question: typeof question === "string"
                ? question
                : typeof message === "string"
                    ? message
                    : typeof input === "string"
                        ? input
                        : typeof query === "string"
                            ? query
                            : undefined,
        };
    }
    return {};
}
async function chatController(req, res, next) {
    try {
        const payload = normalizeQuestionPayload(req);
        const result = chatSchema.safeParse(payload);
        if (!result.success) {
            return next(result.error);
        }
        const { question } = result.data;
        const answer = await (0, chat_service_1.askQuestion)(question);
        return res.json({
            success: true,
            answer,
        });
    }
    catch (error) {
        return next(error);
    }
}
