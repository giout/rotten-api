"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_util_1 = require("../utils/error.util");
const signature = process.env.TOKEN_SIGNATURE;
const authentication = (req, res, next) => {
    const auth = req.headers['authorization'] || '';
    // authentication with Bearer token
    try {
        if (!auth.toLowerCase().startsWith('bearer') &&
            auth.split(' ').length !== 2) {
            throw new error_util_1.CustomError('Invalid bearer token.', 400);
        }
        const token = auth.split(' ')[1]; // Bearer[0] jf8jf8rf9ff4[1]
        // verify token is valid
        jsonwebtoken_1.default.verify(token, signature, (err, decoded) => {
            if (err) {
                throw new error_util_1.CustomError('Invalid session.', 401);
            }
            // add property to request object that contains token payload
            req.user = decoded;
        });
        return next();
    }
    catch (error) {
        next(error);
    }
};
exports.authentication = authentication;
