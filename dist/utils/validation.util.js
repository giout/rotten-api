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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userExists = exports.validatePassword = void 0;
const users_service_1 = require("../services/users.service");
const error_util_1 = require("./error.util");
const validatePassword = (password) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/;
    if (!regex.test(password))
        throw new error_util_1.CustomError('Password must contain at least 8 characters, letters and numbers.', 400);
};
exports.validatePassword = validatePassword;
const userExists = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, users_service_1.selectUserByPk)(id);
    if (!user)
        throw new error_util_1.CustomError('User does not exist.', 404);
    return user;
});
exports.userExists = userExists;
