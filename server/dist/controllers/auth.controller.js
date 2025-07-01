"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = exports.signIn = exports.register = void 0;
const connectDb_1 = require("../app/utils/connectDb");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongodb_1 = require("mongodb");
const register = async (req, res, next) => {
    try {
        const { name, email, password, photo } = req.body;
        const existingUser = await connectDb_1.userCollection.findOne({ email });
        if (existingUser) {
            res.json({ message: "Email already exists" });
            return;
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = { name, email, password: hashedPassword, photo };
        await connectDb_1.userCollection.insertOne(user);
        res.json({
            success: true,
            message: "Registration successful",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await connectDb_1.userCollection.findOne({ email });
        if (!user) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        const jwtSecret = process.env.JWT_SECRET;
        const token = jsonwebtoken_1.default.sign({ email: user.email, id: user._id }, jwtSecret, {
            expiresIn: "2h",
        });
        res.json({
            success: true,
            message: "Sign In successful",
            token,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.signIn = signIn;
const getCurrentUser = async (req, res, next) => {
    try {
        console.log("hit");
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).json({ message: "No token provided" });
            return;
        }
        const token = authHeader.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        const user = await connectDb_1.userCollection.findOne({
            _id: new mongodb_1.ObjectId(decoded.id),
        });
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }
        // Do not send password
        // const {password, ...userInfo } = user;
        res.json({ user });
    }
    catch (err) {
        next(err);
    }
};
exports.getCurrentUser = getCurrentUser;
