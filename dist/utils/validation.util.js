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
exports.mediaExists = exports.genreExists = exports.commentExists = exports.reviewExists = exports.userExists = exports.dataMissing = exports.verifyAuth = exports.validatePassword = void 0;
const users_service_1 = require("../services/users.service");
const error_util_1 = require("./error.util");
const reviews_service_1 = require("../services/reviews.service");
const comments_service_1 = require("../services/comments.service");
const genres_service_1 = require("../services/genres.service");
const media_service_1 = require("../services/media.service");
const validatePassword = (password) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/;
    if (!regex.test(password))
        throw new error_util_1.CustomError('Password must contain at least 8 characters, letters and numbers.', 400);
};
exports.validatePassword = validatePassword;
// verify if user that tries to manipulate data is the authenticated user
const verifyAuth = (req, id) => {
    const { user } = req;
    if (user.id != id)
        throw new error_util_1.CustomError('It is not allowed to create, update or delete data of a user that is not authenticated.', 401);
};
exports.verifyAuth = verifyAuth;
const dataMissing = () => {
    throw new error_util_1.CustomError('Requested data is missing.', 400);
};
exports.dataMissing = dataMissing;
const userExists = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, users_service_1.selectUserByPk)(id);
    if (!user)
        throw new error_util_1.CustomError('User does not exist.', 404);
    return user;
});
exports.userExists = userExists;
const reviewExists = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield (0, reviews_service_1.selectReviewByPk)(id);
    if (!review)
        throw new error_util_1.CustomError('Review does not exist.', 404);
    return review;
});
exports.reviewExists = reviewExists;
const commentExists = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield (0, comments_service_1.selectCommentByPk)(id);
    if (!comment)
        throw new error_util_1.CustomError('Comment does not exist.', 404);
    return comment;
});
exports.commentExists = commentExists;
const genreExists = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const genre = yield (0, genres_service_1.selectGenreByPk)(id);
    if (!genre)
        throw new error_util_1.CustomError('Genre does not exist.', 404);
    return genre;
});
exports.genreExists = genreExists;
const mediaExists = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const media = yield (0, media_service_1.selectMediaByPk)(id);
    if (!media)
        throw new error_util_1.CustomError('Movie or show does not exist.', 404);
    return media;
});
exports.mediaExists = mediaExists;
