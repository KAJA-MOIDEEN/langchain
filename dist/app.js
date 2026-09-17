"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const chat_routes_1 = __importDefault(require("./routes/chat.routes"));
const error_middleware_1 = require("./middleware/error.middleware");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.text({ type: "text/plain" }));
app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        service: "LangChain RAG API",
    });
});
app.use("/api", chat_routes_1.default);
app.use(error_middleware_1.errorMiddleware);
exports.default = app;
