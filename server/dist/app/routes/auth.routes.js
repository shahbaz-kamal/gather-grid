"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
exports.authRoutes = express_1.default.Router();
exports.authRoutes.post("/register", auth_controller_1.register);
exports.authRoutes.post("/sign-in", auth_controller_1.signIn);
exports.authRoutes.get("/currentUser", auth_controller_1.getCurrentUser);
