import express from "express";
import {
  getCurrentUser,
  register,
  signIn,
} from "../controllers/auth.controller";

export const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/sign-in", signIn);
authRoutes.get("/currentUser", getCurrentUser);
