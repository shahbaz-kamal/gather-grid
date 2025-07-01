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
      success: true,
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
    const { title = "", dateFilter = "" } = req.query;
    const filter: any = {};
    console.log(dateFilter, title);
    if (title) {
      filter.eventTitle = { $regex: title as string, $options: "i" };
    }
    const now = new Date();
    let startDate: Date | null = null;
    let endDate: Date | null = null;

    // Helper: format Date (UTC) to 'YYYY-MM-DD' string
    const formatDateToString = (date: Date) => {
      const y = date.getUTCFullYear();
      const m = (date.getUTCMonth() + 1).toString().padStart(2, "0");
      const d = date.getUTCDate().toString().padStart(2, "0");
      return `${y}-${m}-${d}`;
    };

    switch (dateFilter) {
      case "today": {
        const today = new Date();
        startDate = new Date(
          Date.UTC(
            today.getUTCFullYear(),
            today.getUTCMonth(),
            today.getUTCDate()
          )
        );
        endDate = new Date(
          Date.UTC(
            today.getUTCFullYear(),
            today.getUTCMonth(),
            today.getUTCDate()
          )
        );
        break;
      }
      case "currentWeek": {
        const day = now.getUTCDay(); // 0 = Sunday
        const diffToMonday = day === 0 ? 6 : day - 1;
        const monday = new Date(now);
        monday.setUTCDate(now.getUTCDate() - diffToMonday);
        startDate = new Date(
          Date.UTC(
            monday.getUTCFullYear(),
            monday.getUTCMonth(),
            monday.getUTCDate()
          )
        );

        const sunday = new Date(startDate);
        sunday.setUTCDate(startDate.getUTCDate() + 6);
        endDate = new Date(
          Date.UTC(
            sunday.getUTCFullYear(),
            sunday.getUTCMonth(),
            sunday.getUTCDate()
          )
        );
        break;
      }
      case "lastWeek": {
        const day = now.getUTCDay();
        const diffToMonday = day === 0 ? 6 : day - 1;
        const lastMonday = new Date(now);
        lastMonday.setUTCDate(now.getUTCDate() - diffToMonday - 7);
        startDate = new Date(
          Date.UTC(
            lastMonday.getUTCFullYear(),
            lastMonday.getUTCMonth(),
            lastMonday.getUTCDate()
          )
        );

        const lastSunday = new Date(startDate);
        lastSunday.setUTCDate(startDate.getUTCDate() + 6);
        endDate = new Date(
          Date.UTC(
            lastSunday.getUTCFullYear(),
            lastSunday.getUTCMonth(),
            lastSunday.getUTCDate()
          )
        );
        break;
      }
      case "currentMonth": {
        startDate = new Date(
          Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)
        );
        endDate = new Date(
          Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0)
        );
        break;
      }
      case "lastMonth": {
        startDate = new Date(
          Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1)
        );
        endDate = new Date(
          Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 0)
        );
        break;
      }
    }

    if (startDate && endDate) {
      // Add 1 day to endDate to make range exclusive
      const endDateExclusive = new Date(endDate);
      endDateExclusive.setUTCDate(endDate.getUTCDate() + 1);

      filter.dateAndTime = {
        $gte: formatDateToString(startDate),
        $lt: formatDateToString(endDateExclusive),
      };

      console.log("Date filter:", filter.dateAndTime);
      console.log(filter);
    }

    const result = await eventCollection
      .find(filter)
      .sort({ dateAndTime: -1 })
      .toArray();
    res.json({
      success: true,
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
      success: true,
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
      success: true,
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
      success: true,
      message: "You joined the event successfully",
    });
    return;
  } catch (error) {
    next(error);
  }
};
export const getMyEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const email = req.query.email as string;

    if (!email) {
      res.status(400).json({ success: false, message: "Email is required" });
      return;
    }
    const query = { email };
    const result = await eventCollection.find(query).toArray();

    res.json({
      success: true,
      message: "You joined the event successfully",
      events: result,
    });
  } catch (err) {
    next(err);
  }
};
export const deleteMyEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id;

    const query = { _id: new ObjectId(id) };
    const result = await eventCollection.deleteOne(query);
    if (res.deletedCount === 0) {
      res.status(404).json({ success: false, message: "Could not delete" });
      return;
    }
    res.json({
      success: true,
      message: "Your event was deleted successfully",
      events: result,
    });
  } catch (err) {
    next(err);
  }
};
