import { NextFunction, Request, Response } from "express";
import { userCollection } from "../utils/connectDb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { ObjectId } from "mongodb";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password, photo } = req.body;
    const existingUser = await userCollection.findOne({ email });
    if (existingUser) {
      res.json({ message: "Email already exists" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { name, email, password: hashedPassword, photo };
    await userCollection.insertOne(user);
    res.json({
      success: true,
      message: "Registration successful",
    });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await userCollection.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    const jwtSecret = process.env.JWT_SECRET;
    const token = jwt.sign({ email: user.email, id: user._id }, jwtSecret!, {
      expiresIn: "2h",
    });
    res.json({
      success: true,
      message: "Sign In successful",
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log("hit");
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ message: "No token provided" });
      return;
    }

    const token = authHeader.split(" ")[1];
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    console.log(decoded);

    const user = await userCollection.findOne({
      _id: new ObjectId(decoded.id),
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    // Do not send password
    // const {password, ...userInfo } = user;

    res.json({ user });
  } catch (err) {
    next(err);
  }
};
