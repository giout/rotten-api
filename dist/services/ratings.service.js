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
exports.selectRatingsByUser = exports.selectRatingsCriticAvgAndCount = exports.selectRatingsPublicAvgAndCount = exports.deleteRating = exports.selectRatingByPk = exports.insertRating = void 0;
const database_1 = __importDefault(require("../config/database"));
const ratings_query_1 = __importDefault(require("../queries/ratings.query"));
const insertRating = (entry) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, mediaId, score } = entry;
    const sentence = ratings_query_1.default.insert;
    const rating = yield database_1.default.query(sentence, [userId, mediaId, score]);
    return {
        userId: rating.rows[0].user_id,
        mediaId: rating.rows[0].media_id,
        score: rating.rows[0].score,
    };
});
exports.insertRating = insertRating;
const selectRatingByPk = (entry) => __awaiter(void 0, void 0, void 0, function* () {
    const sentence = ratings_query_1.default.select.by.pk;
    const rating = yield database_1.default.query(sentence, [entry.userId, entry.mediaId]);
    if (!rating.rows[0])
        return;
    return {
        userId: rating.rows[0].user_id,
        mediaId: rating.rows[0].media_id,
        score: rating.rows[0].score,
    };
});
exports.selectRatingByPk = selectRatingByPk;
const deleteRating = (entry) => __awaiter(void 0, void 0, void 0, function* () {
    const sentence = ratings_query_1.default.delete;
    yield database_1.default.query(sentence, [entry.userId, entry.mediaId]);
});
exports.deleteRating = deleteRating;
const selectRatingsPublicAvgAndCount = (mediaId) => __awaiter(void 0, void 0, void 0, function* () {
    const sentence = ratings_query_1.default.select.avgAndCount.public;
    const ratings = yield database_1.default.query(sentence, [mediaId]);
    return {
        score: parseFloat(ratings.rows[0].avg) || 0,
        ratings: parseInt(ratings.rows[0].count)
    };
});
exports.selectRatingsPublicAvgAndCount = selectRatingsPublicAvgAndCount;
const selectRatingsCriticAvgAndCount = (mediaId) => __awaiter(void 0, void 0, void 0, function* () {
    const sentence = ratings_query_1.default.select.avgAndCount.critic;
    const ratings = yield database_1.default.query(sentence, [mediaId]);
    return {
        score: parseFloat(ratings.rows[0].avg) || 0,
        ratings: parseInt(ratings.rows[0].count)
    };
});
exports.selectRatingsCriticAvgAndCount = selectRatingsCriticAvgAndCount;
const selectRatingsByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const sentence = ratings_query_1.default.select.count.userRatings;
    const ratings = yield database_1.default.query(sentence, [userId]);
    return parseInt(ratings.rows[0].count);
});
exports.selectRatingsByUser = selectRatingsByUser;
