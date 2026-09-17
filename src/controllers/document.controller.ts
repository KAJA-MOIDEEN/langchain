import { NextFunction, Request, Response } from "express";
import { ingestPdf } from "../services/rag.service";

export async function uploadDocumentController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!Buffer.isBuffer(req.body) || req.body.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Upload a non-empty PDF file.",
      });
    }

    const fileName = req.header("x-file-name") || "uploaded-document.pdf";
    if (!fileName.toLowerCase().endsWith(".pdf")) {
      return res.status(400).json({
        success: false,
        message: "Only PDF files are supported.",
      });
    }

    const bytes = new Uint8Array(req.body.length);
    bytes.set(req.body);
    const file = new Blob([bytes], { type: "application/pdf" });
    const result = await ingestPdf(file, fileName);

    return res.status(201).json({
      success: true,
      message: `${fileName} has been indexed and is ready for questions.`,
      ...result,
    });
  } catch (error) {
    return next(error);
  }
}
