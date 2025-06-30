import express from "express";
import { register, signIn } from "../../controllers/auth.controller";
export const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/sign-in", signIn);
