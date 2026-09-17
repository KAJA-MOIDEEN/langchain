import { Request, Response, NextFunction } from "express";

export function errorMiddleware(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(error);

  if (error.name === "ZodError") {
    return res.status(400).json({
      success: false,
      message: "Invalid request",
      errors: error.errors,
    });
  }

  const message =
    error?.message && typeof error.message === "string"
      ? error.message
      : "Internal server error";

  res.status(500).json({
    success: false,
    message,
  });
}