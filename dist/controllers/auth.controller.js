"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logIn = exports.signUp = void 0;
const error_util_1 = require("../utils/error.util");
const validation_util_1 = require("../utils/validation.util");
const crypt_util_1 = require("../utils/crypt.util");
const users_service_1 = require("../services/users.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { username, firstName, lastName, password, isCritic } = req.body;
        const user = yield (0, users_service_1.selectUserByUsername)(username);
        if (user)
            throw new error_util_1.CustomError('User already exists.', 400);
        // validate empty fields
        if (!(username && firstName && lastName && password && isCritic != undefined && isCritic != null))
            throw new error_util_1.CustomError('Data is missing.', 400);
        (0, validation_util_1.validatePassword)(password);
        password = (0, crypt_util_1.encrypt)(password);
        const createdUser = yield (0, users_service_1.insertUser)(req.body);
        res.status(201).json({
            code: 201,
            data: createdUser
        });
    }
    catch (e) {
        next(e);
    }
});
exports.signUp = signUp;
const logIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        // verify if user exists
        const user = yield (0, users_service_1.selectUserByUsername)(username);
        if (!user)
            throw new error_util_1.CustomError('User does not exist.', 404);
        // verify if password matches
        const equals = (0, crypt_util_1.compareCrypted)(password, user.pass);
        if (!equals)
            throw new error_util_1.CustomError('Password is invalid.', 401);
        // create and send authentication token    
        const signature = process.env.TOKEN_SIGNATURE;
        const payload = { id: user.user_id }; // data payload
        const token = jsonwebtoken_1.default.sign(payload, signature, {
            expiresIn: 60 * 60 * 24 * 30 // 1 month
        });
        res.status(200).json({
            code: 200,
            data: {
                token
            }
        });
    }
    catch (e) {
        next(e);
    }
});
exports.logIn = logIn;
