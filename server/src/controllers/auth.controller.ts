import { NextFunction, Request, Response } from "express";

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json({
      success: true,
      message: "Sign In successful",
    });
  } catch (error) {
    next(error);
  }
};
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json({
      success: true,
      message: "Sign In successful",
    });
  } catch (error) {
    next(error);
  }
};
