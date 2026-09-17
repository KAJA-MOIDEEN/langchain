import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  OPENAI_API_KEY: z.string().min(1),
  OPENAI_BASE_URL: z
    .string()
    .url()
    .default("https://api.openai.com/v1"),

  PORT: z.coerce.number().default(5000),

  SUPABASE_DATABASE_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);