"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const logger_1 = require("./app/middlewares/logger");
const app = (0, express_1.default)();
// middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(logger_1.logger);
exports.default = app;
