"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const logger_1 = require("./app/middlewares/logger");
const event_route_1 = require("./app/routes/event.route");
const auth_routes_1 = require("./app/routes/auth.routes");
const app = (0, express_1.default)();
const corsOptions = {
    origin: ["http://localhost:8800", "https://gather-grid-by-shahbaz.netlify.app"],
    credentials: true,
};
// middlewares
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(logger_1.logger);
//using routes
app.use("/api/events", event_route_1.eventsRoutes);
//authentication
app.use("/api/auth", auth_routes_1.authRoutes);
app.get("/", async (req, res) => {
    res.send("Welcome to the Event Management API");
});
// handles 404 error
app.use((req, res, next) => {
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
app.use((error, req, res, next) => {
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
exports.default = app;
