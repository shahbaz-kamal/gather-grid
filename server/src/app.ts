import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { logger } from "./app/middlewares/logger";
import { eventsRoutes } from "./app/routes/event.route";
import { authRoutes } from "./app/routes/auth.routes";

const app: Application = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(logger);

//using routes
app.use("/api/events", eventsRoutes);

//authentication
 app.use("/api/auth", authRoutes); // Uncomment when auth routes are implemented

// handles 404 error
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    message: "Route Not Found",
    success: false,
    error: {
      name: "NotFoundError",
      details: `Cannot ${req.method} ${req.originalUrl}`,
    },
  });
  next();
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error.name === "ValidationError") {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error: {
        name: error.name,
        errors: error.errors,
      },
    });
    return;
  }

  if (error.name === "ReferenceError") {
    res.status(400).json({
      message: error.message,
      success: false,
      error: {
        name: error.name,
        details: error.details || null,
      },
    });
    return;
  }

  // Generic fallback
  res.status(500).json({
    success: false,
    message: "Something went wrong",
    error,
  });
  return;
});

export default app;
