"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const connectDb_1 = require("./app/utils/connectDb");
dotenv_1.default.config();
const port = process.env.PORT || 5000;
(0, connectDb_1.connectDB)()
    .then(() => {
    app_1.default.listen(port, () => {
        console.log(`🚩 GEN ART.AI is running on port : ${port}`);
        console.log(`✅ Connected to MONGODB`);
    });
})
    .catch((err) => {
    console.log(err);
});
