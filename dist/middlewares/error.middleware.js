"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const error_util_1 = require("../utils/error.util");
const errorHandler = (err, req, res, next) => {
    console.log(err);
    if (err instanceof error_util_1.CustomError) {
        return res.status(err.statusCode).json({
            code: err.statusCode,
            msg: err.message
        });
    }
    res.status(500).json({ msg: "Internal server error." });
};
exports.errorHandler = errorHandler;
