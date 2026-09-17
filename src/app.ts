import express from "express";
import cors from "cors";
import path from "node:path";

import chatRoutes from "./routes/chat.routes";
import { errorMiddleware } from "./middleware/error.middleware";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.text({ type: "text/plain" }));
app.use(express.static(path.join(process.cwd(), "public")));

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    service: "LangChain RAG API",
  });