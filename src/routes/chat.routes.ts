import express, { Router } from "express";
import { chatController } from "../controllers/chat.controller";
import { uploadDocumentController } from "../controllers/document.controller";

const router = Router();

router.post("/chat", chatController);
router.post(
  "/documents",
  express.raw({ type: ["application/pdf", "application/octet-stream"], limit: "20mb" }),
  uploadDocumentController
);

export default router;
