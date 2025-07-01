"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const connectDb_1 = __importDefault(require("./app/utils/connectDb"));
const port = process.env.PORT || 5000;
const bootstrap = async () => {
    await (0, connectDb_1.default)();
    app_1.default.listen(port, () => {
        console.log(`🔥 Gathergrid  server is running on port ${port}`);
        console.log(`🚩 Connected to MONGODB`);
    });
};
bootstrap();
