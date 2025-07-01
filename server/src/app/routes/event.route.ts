import express from "express";
import { addEvent, deleteMyEvent, getEvents, getMyEvents, getSingleEvent, joinEvent, updateEvent } from "../controllers/events.controller";


export const eventsRoutes = express.Router();

//add event
eventsRoutes.post("/add-event", addEvent);
//get all event
eventsRoutes.get("/get-events", getEvents);

//get single event
eventsRoutes.get("/get-single-event/:id", getSingleEvent);

//update single event
eventsRoutes.patch("/update-event/:id", updateEvent); //update evnet

// joining events, increasing attendee count count
eventsRoutes.patch("/join/:id", joinEvent);

//getting my events
eventsRoutes.get("/my-events", getMyEvents);

//delete an event

eventsRoutes.delete("/delete/:id", deleteMyEvent);
