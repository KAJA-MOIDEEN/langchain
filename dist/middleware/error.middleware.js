"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = errorMiddleware;
function errorMiddleware(error, req, res, next) {
    console.error(error);
    if (error.name === "ZodError") {
        return res.status(400).json({
            success: false,
            message: "Invalid request",
            errors: error.errors,
        });
    }
    const message = error?.message && typeof error.message === "string"
        ? error.message
        : "Internal server error";
    res.status(500).json({
        success: false,
        message,
    });
}
