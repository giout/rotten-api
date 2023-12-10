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
exports.getReviewComments = exports.deleteReview = exports.getReviewById = exports.postReview = void 0;
const reviews_service_1 = require("../services/reviews.service");
const comments_service_1 = require("../services/comments.service");
const validation_util_1 = require("../utils/validation.util");
const postReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, mediaId, content } = req.body;
        if (!(userId && mediaId && content))
            (0, validation_util_1.dataMissing)();
        (0, validation_util_1.verifyAuth)(req, userId);
        const review = yield (0, reviews_service_1.createReview)(req.body);
        res.status(201).json({
            code: 201,
            data: review
        });
    }
    catch (e) {
        next(e);
    }
});
exports.postReview = postReview;
const getReviewById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const review = yield (0, validation_util_1.reviewExists)(id);
        res.status(200).json({
            code: 200,
            data: review
        });
    }
    catch (e) {
        next(e);
    }
});
exports.getReviewById = getReviewById;
const deleteReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const review = yield (0, validation_util_1.reviewExists)(id);
        (0, validation_util_1.verifyAuth)(req, review.userId);
        yield (0, reviews_service_1.deleteReviewByPk)(id);
        res.status(200).json({
            code: 200
        });
    }
    catch (e) {
        next(e);
    }
});
exports.deleteReview = deleteReview;
const getReviewComments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, validation_util_1.reviewExists)(id);
        const comments = yield (0, comments_service_1.selectCommentsByReviewId)(id);
        res.status(200).json({
            code: 200,
            data: comments
        });
    }
    catch (e) {
        next(e);
    }
});
exports.getReviewComments = getReviewComments;
