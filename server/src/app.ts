import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { logger } from "./app/middlewares/logger";
import { eventsRoutes } from "./app/routes/event.route";
import { authRoutes } from "./app/routes/auth.routes";

const app: Application = express();

const corsOptions = {
  origin: ["http://localhost:8800","https://gather-grid-by-shahbaz.netlify.app"],
  credentials: true,
};
// middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(logger);

//using routes
app.use("/api/events", eventsRoutes);

//authentication
app.use("/api/auth", authRoutes);

app.get("/",async(req:Request,res:Response)=>{
  res.send("Welcome to the Event Management API");
})

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
