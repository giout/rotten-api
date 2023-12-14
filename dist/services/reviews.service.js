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
exports.selectReviewsByUser = exports.deleteReviewByPk = exports.selectReviewByPk = exports.createReview = exports.selectReviewsByMedia = void 0;
const database_1 = __importDefault(require("../config/database"));
const reviews_query_1 = __importDefault(require("../queries/reviews.query"));
const selectReviewsByMedia = (movieId) => __awaiter(void 0, void 0, void 0, function* () {
    const sentence = reviews_query_1.default.select.by.mediaId;
    const reviews = yield database_1.default.query(sentence, [movieId]);
    const response = [];
    reviews.rows.map(review => {
        response.push({
            id: review.review_id,
            userId: review.user_id,
            content: review.review_content,
            mediaId: review.media_id,
            date: review.review_date
        });
    });
    return response;
});
exports.selectReviewsByMedia = selectReviewsByMedia;
const createReview = (entry) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, mediaId, content } = entry;
    const sentence = reviews_query_1.default.insert;
    const review = yield database_1.default.query(sentence, [userId, mediaId, content]);
    return {
        id: review.rows[0].review_id,
        userId: review.rows[0].user_id,
        content: review.rows[0].review_content,
        mediaId: review.rows[0].media_id,
        date: review.rows[0].review_date
    };
});
exports.createReview = createReview;
const selectReviewByPk = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const sentence = reviews_query_1.default.select.by.pk;
    const review = yield database_1.default.query(sentence, [id]);
    if (!review.rows[0])
        return;
    return {
        id: review.rows[0].review_id,
        userId: review.rows[0].user_id,
        content: review.rows[0].review_content,
        mediaId: review.rows[0].media_id,
        date: review.rows[0].review_date
    };
});
exports.selectReviewByPk = selectReviewByPk;
const deleteReviewByPk = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const sentence = reviews_query_1.default.delete;
    yield database_1.default.query(sentence, [id]);
});
exports.deleteReviewByPk = deleteReviewByPk;
const selectReviewsByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const sentence = reviews_query_1.default.select.count.userReviews;
    const reviews = yield database_1.default.query(sentence, [userId]);
    return parseInt(reviews.rows[0].count);
});
exports.selectReviewsByUser = selectReviewsByUser;
