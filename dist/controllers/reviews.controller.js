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
const postReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, mediaId, content } = req.body;
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
        const review = yield (0, reviews_service_1.selectReviewByPk)(id);
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
