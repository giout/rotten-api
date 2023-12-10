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
exports.selectCriticScore = exports.selectPublicScore = exports.selectCriticRatings = exports.selectPublicRatings = exports.deleteRating = exports.selectRatingByPk = exports.insertRating = void 0;
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
const selectPublicRatings = (mediaId) => __awaiter(void 0, void 0, void 0, function* () {
    const sentence = ratings_query_1.default.select.count.publicRatings;
    const ratings = yield database_1.default.query(sentence, [mediaId]);
    return parseInt(ratings.rows[0].count);
});
exports.selectPublicRatings = selectPublicRatings;
const selectCriticRatings = (mediaId) => __awaiter(void 0, void 0, void 0, function* () {
    const sentence = ratings_query_1.default.select.count.criticRatings;
    const ratings = yield database_1.default.query(sentence, [mediaId]);
    return parseInt(ratings.rows[0].count);
});
exports.selectCriticRatings = selectCriticRatings;
const selectPublicScore = (mediaId) => __awaiter(void 0, void 0, void 0, function* () {
    const sentence = ratings_query_1.default.select.average.publicScore;
    const ratings = yield database_1.default.query(sentence, [mediaId]);
    if (!ratings.rows[0].avg)
        return 0;
    return parseFloat(ratings.rows[0].avg);
});
exports.selectPublicScore = selectPublicScore;
const selectCriticScore = (mediaId) => __awaiter(void 0, void 0, void 0, function* () {
    const sentence = ratings_query_1.default.select.average.criticScore;
    const ratings = yield database_1.default.query(sentence, [mediaId]);
    if (!ratings.rows[0].avg)
        return 0;
    return parseFloat(ratings.rows[0].avg);
});
exports.selectCriticScore = selectCriticScore;
