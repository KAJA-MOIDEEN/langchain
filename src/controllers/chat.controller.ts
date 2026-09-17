import { Request, Response, NextFunction } from "express";
import { z } from "zod";

import { askQuestion } from "../services/chat.service";

const chatSchema = z.object({
  question: z
    .string()
    .trim()
    .min(1)
    .max(2000),
});

function normalizeQuestionPayload(req: Request) {
  if (typeof req.body === "string") {
    return { question: req.body };
  }

  if (typeof req.body === "object" && req.body !== null) {
    const { question, message, input, query } = req.body as Record<string, unknown>;

    return {
      question:
        typeof question === "string"
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

export async function chatController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const payload = normalizeQuestionPayload(req);
    const result = chatSchema.safeParse(payload);

    if (!result.success) {
      return next(result.error);
    }

    const { question } = result.data;
    const answer = await askQuestion(question);

    return res.json({
      success: true,
      answer,
    });
  } catch (error) {
    return next(error);
  }
}
