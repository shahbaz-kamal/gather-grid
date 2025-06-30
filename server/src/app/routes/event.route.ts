import express from "express";
import { addEvent, getEvents } from "../../controllers/events.controller";

export const eventsRoutes = express.Router();

eventsRoutes.post("/add-event", addEvent);

eventsRoutes.get("/get-events", getEvents);
