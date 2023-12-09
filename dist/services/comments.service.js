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
exports.deleteCommentByPk = exports.selectCommentByPk = exports.createComment = exports.selectCommentsByReviewId = void 0;
const database_1 = __importDefault(require("../config/database"));
const comments_query_1 = __importDefault(require("../queries/comments.query"));
var i = 0;
const selectCommentsByReviewId = (reviewId) => __awaiter(void 0, void 0, void 0, function* () {
    const sentence = comments_query_1.default.select.by.reviewId;
    const comments = yield database_1.default.query(sentence, [reviewId]);
    console.log(i++);
    console.log(comments.rows);
    return comments.rows;
});
exports.selectCommentsByReviewId = selectCommentsByReviewId;
const createComment = (entry) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, reviewId, content } = entry;
    const sentence = comments_query_1.default.insert;
    const review = yield database_1.default.query(sentence, [userId, reviewId, content]);
    console.log(i++);
    console.log(review.rows[0]);
    return review.rows[0];
});
exports.createComment = createComment;
const selectCommentByPk = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const sentence = comments_query_1.default.select.by.pk;
    const review = yield database_1.default.query(sentence, [id]);
    console.log(i++);
    console.log(review.rows[0]);
    return review.rows[0];
});
exports.selectCommentByPk = selectCommentByPk;
const deleteCommentByPk = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const sentence = comments_query_1.default.delete;
    console.log(i++);
    yield database_1.default.query(sentence, [id]);
});
exports.deleteCommentByPk = deleteCommentByPk;
