import { Request, Response, NextFunction } from "express";
import { IEvent } from "../app/interfaces/events.interface";
import { eventCollection } from "../app/utils/connectDb";

export const addEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newEvent: IEvent = req.body;
    newEvent.attendeeCount = 0;
    const result = await eventCollection.insertOne(newEvent);
    res.json({
      sucess: true,
      message: "Event added successfully",
      event: newEvent,
    });
    return;
  } catch (error) {
    next(error);
  }
};

export const getEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await eventCollection.find().toArray();
    res.json({
      sucess: true,
      message: "Event added successfully",
      events: result,
    });
    return;
  } catch (error) {
    next(error);
  }
};
