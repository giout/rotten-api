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
exports.deleteUser = exports.putUser = exports.getUserById = exports.getAllUsers = exports.getAuthUser = void 0;
const validation_util_1 = require("../utils/validation.util");
const users_service_1 = require("../services/users.service");
const crypt_util_1 = require("../utils/crypt.util");
const getAuthUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get payload from token
        const { user } = req;
        const authUser = yield (0, validation_util_1.userExists)(user.id);
        res.status(200).json({
            code: 200,
            data: authUser
        });
    }
    catch (e) {
        next(e);
    }
});
exports.getAuthUser = getAuthUser;
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, users_service_1.selectAllUsers)();
        // get ratings and add them to users
        // get reviews and add them to users
        res.status(200).json({
            code: 200,
            data: users
        });
    }
    catch (e) {
        next(e);
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield (0, validation_util_1.userExists)(id);
        // get ratings and add them to user
        // get reviews and add them to user
        res.status(200).json({
            code: 200,
            data: user
        });
    }
    catch (e) {
        next(e);
    }
});
exports.getUserById = getUserById;
const putUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { firstName, lastName, password } = req.body;
        if (!(firstName || lastName || password))
            (0, validation_util_1.dataMissing)();
        (0, validation_util_1.verifyAuth)(req, id);
        (0, validation_util_1.validatePassword)(password);
        req.body.password = (0, crypt_util_1.encrypt)(password);
        const user = yield (0, users_service_1.updateUser)(id, req.body);
        res.status(200).json({
            code: 200,
            data: user
        });
    }
    catch (e) {
        next(e);
    }
});
exports.putUser = putUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, validation_util_1.userExists)(id);
        (0, validation_util_1.verifyAuth)(req, id);
        yield (0, users_service_1.deleteUserByPk)(id);
        res.status(200).json({
            code: 200
        });
    }
    catch (e) {
        next(e);
    }
});
exports.deleteUser = deleteUser;
