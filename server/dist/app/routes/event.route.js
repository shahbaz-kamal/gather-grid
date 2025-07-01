"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const events_controller_1 = require("../controllers/events.controller");
exports.eventsRoutes = express_1.default.Router();
//add event
exports.eventsRoutes.post("/add-event", events_controller_1.addEvent);
//get all event
exports.eventsRoutes.get("/get-events", events_controller_1.getEvents);
//get single event
exports.eventsRoutes.get("/get-single-event/:id", events_controller_1.getSingleEvent);
//update single event
exports.eventsRoutes.patch("/update-event/:id", events_controller_1.updateEvent); //update evnet
// joining events, increasing attendee count count
exports.eventsRoutes.patch("/join/:id", events_controller_1.joinEvent);
//getting my events
exports.eventsRoutes.get("/my-events", events_controller_1.getMyEvents);
//delete an event
exports.eventsRoutes.delete("/delete/:id", events_controller_1.deleteMyEvent);
