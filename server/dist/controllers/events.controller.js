"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMyEvent = exports.getMyEvents = exports.joinEvent = exports.updateEvent = exports.getSingleEvent = exports.getEvents = exports.addEvent = void 0;
const connectDb_1 = require("../app/utils/connectDb");
const mongodb_1 = require("mongodb");
//add event
const addEvent = async (req, res, next) => {
    try {
        const newEvent = req.body;
        newEvent.attendeeCount = 0;
        const result = await connectDb_1.eventCollection.insertOne(newEvent);
        res.json({
            success: true,
            message: "Event added successfully",
            event: newEvent,
        });
        return;
    }
    catch (error) {
        next(error);
    }
};
exports.addEvent = addEvent;
//get all event
const getEvents = async (req, res, next) => {
    try {
        const { title = "", dateFilter = "" } = req.query;
        const filter = {};
        console.log(dateFilter, title);
        if (title) {
            filter.eventTitle = { $regex: title, $options: "i" };
        }
        const now = new Date();
        let startDate = null;
        let endDate = null;
        // Helper: format Date (UTC) to 'YYYY-MM-DD' string
        const formatDateToString = (date) => {
            const y = date.getUTCFullYear();
            const m = (date.getUTCMonth() + 1).toString().padStart(2, "0");
            const d = date.getUTCDate().toString().padStart(2, "0");
            return `${y}-${m}-${d}`;
        };
        switch (dateFilter) {
            case "today": {
                const today = new Date();
                startDate = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
                endDate = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
                break;
            }
            case "currentWeek": {
                const day = now.getUTCDay(); // 0 = Sunday
                const diffToMonday = day === 0 ? 6 : day - 1;
                const monday = new Date(now);
                monday.setUTCDate(now.getUTCDate() - diffToMonday);
                startDate = new Date(Date.UTC(monday.getUTCFullYear(), monday.getUTCMonth(), monday.getUTCDate()));
                const sunday = new Date(startDate);
                sunday.setUTCDate(startDate.getUTCDate() + 6);
                endDate = new Date(Date.UTC(sunday.getUTCFullYear(), sunday.getUTCMonth(), sunday.getUTCDate()));
                break;
            }
            case "lastWeek": {
                const day = now.getUTCDay();
                const diffToMonday = day === 0 ? 6 : day - 1;
                const lastMonday = new Date(now);
                lastMonday.setUTCDate(now.getUTCDate() - diffToMonday - 7);
                startDate = new Date(Date.UTC(lastMonday.getUTCFullYear(), lastMonday.getUTCMonth(), lastMonday.getUTCDate()));
                const lastSunday = new Date(startDate);
                lastSunday.setUTCDate(startDate.getUTCDate() + 6);
                endDate = new Date(Date.UTC(lastSunday.getUTCFullYear(), lastSunday.getUTCMonth(), lastSunday.getUTCDate()));
                break;
            }
            case "currentMonth": {
                startDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
                endDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0));
                break;
            }
            case "lastMonth": {
                startDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1));
                endDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 0));
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
        const result = await connectDb_1.eventCollection
            .find(filter)
            .sort({ dateAndTime: -1 })
            .toArray();
        res.json({
            success: true,
            message: "Events retrieved successfully",
            events: result,
        });
        return;
    }
    catch (error) {
        next(error);
    }
};
exports.getEvents = getEvents;
//get single event
const getSingleEvent = async (req, res, next) => {
    try {
        const id = req.params.id;
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = await connectDb_1.eventCollection.findOne(query);
        res.json({
            success: true,
            message: "Event retrieved successfully",
            event: result,
        });
        return;
    }
    catch (error) {
        next(error);
    }
};
exports.getSingleEvent = getSingleEvent;
//update event
const updateEvent = async (req, res, next) => {
    try {
        const id = req.params.id;
        const filter = { _id: new mongodb_1.ObjectId(id) };
        const data = req?.body;
        const updatedDoc = {
            $set: {
                ...data,
            },
        };
        const result = await connectDb_1.eventCollection.updateOne(filter, updatedDoc);
        res.json({
            success: true,
            message: "Event Updated successfully",
        });
        return;
    }
    catch (error) {
        next(error);
    }
};
exports.updateEvent = updateEvent;
// joining events, increasing attendee count count
const joinEvent = async (req, res, next) => {
    try {
        const id = req.params.id;
        const filter = { _id: new mongodb_1.ObjectId(id) };
        const updatedDoc = {
            $inc: {
                attendeeCount: 1,
            },
        };
        const result = await connectDb_1.eventCollection.updateOne(filter, updatedDoc);
        res.json({
            success: true,
            message: "You joined the event successfully",
        });
        return;
    }
    catch (error) {
        next(error);
    }
};
exports.joinEvent = joinEvent;
const getMyEvents = async (req, res, next) => {
    try {
        const email = req.query.email;
        if (!email) {
            res.status(400).json({ success: false, message: "Email is required" });
            return;
        }
        const query = { email };
        const result = await connectDb_1.eventCollection.find(query).toArray();
        res.json({
            success: true,
            message: "You joined the event successfully",
            events: result,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getMyEvents = getMyEvents;
const deleteMyEvent = async (req, res, next) => {
    try {
        const id = req.params.id;
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = await connectDb_1.eventCollection.deleteOne(query);
        if (res.deletedCount === 0) {
            res.status(404).json({ success: false, message: "Could not delete" });
            return;
        }
        res.json({
            success: true,
            message: "Your event was deleted successfully",
            events: result,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteMyEvent = deleteMyEvent;
