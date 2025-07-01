"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const logger = async (req, res, next) => {
    console.log(`🔥Request sent from ${req.hostname} || ${req.method} -${req.url} -${new Date().toLocaleTimeString()}`);
    next();
};
exports.logger = logger;
