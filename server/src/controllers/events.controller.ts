import { Request, Response, NextFunction } from "express";
import { IEvent } from "../app/interfaces/events.interface";
import { eventCollection } from "../app/utils/connectDb";
import { ObjectId } from "mongodb";

//add event
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
//get all event
export const getEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await eventCollection.find().toArray();
    res.json({
      sucess: true,
      message: "Events retrieved successfully",
      events: result,
    });
    return;
  } catch (error) {
    next(error);
  }
};
//get single event
export const getSingleEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await eventCollection.findOne(query);
    res.json({
      sucess: true,
      message: "Event retrieved successfully",
      event: result,
    });
    return;
  } catch (error) {
    next(error);
  }
};
//update event

export const updateEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const data = req?.body;
    const updatedDoc = {
      $set: {
        ...data,
      },
    };

    const result = await eventCollection.updateOne(filter, updatedDoc);

    res.json({
      sucess: true,
      message: "Event Updated successfully",
    });
    return;
  } catch (error) {
    next(error);
  }
};

// joining events, increasing attendee count count
export const joinEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };

    const updatedDoc = {
      $inc: {
        attendeeCount: 1,
      },
    };

    const result = await eventCollection.updateOne(filter, updatedDoc);

    res.json({
      sucess: true,
      message: "You joined the event successfully",
    });
    return;
  } catch (error) {
    next(error);
  }
};
