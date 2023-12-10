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
exports.deleteCommentByPk = exports.selectCommentByPk = exports.insertComment = exports.selectCommentsByReviewId = void 0;
const database_1 = __importDefault(require("../config/database"));
const comments_query_1 = __importDefault(require("../queries/comments.query"));
const selectCommentsByReviewId = (reviewId) => __awaiter(void 0, void 0, void 0, function* () {
    const sentence = comments_query_1.default.select.by.reviewId;
    const comments = yield database_1.default.query(sentence, [reviewId]);
    const response = [];
    comments.rows.map(comment => {
        response.push({
            id: comment.comment_id,
            userId: comment.user_id,
            content: comment.comment_content,
            reviewId: comment.review_id,
            date: comment.comment_date
        });
    });
    return response;
});
exports.selectCommentsByReviewId = selectCommentsByReviewId;
const insertComment = (entry) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, reviewId, content } = entry;
    const sentence = comments_query_1.default.insert;
    const comment = yield database_1.default.query(sentence, [userId, reviewId, content]);
    return {
        id: comment.rows[0].comment_id,
        userId: comment.rows[0].user_id,
        content: comment.rows[0].comment_content,
        reviewId: comment.rows[0].review_id,
        date: comment.rows[0].comment_date
    };
});
exports.insertComment = insertComment;
const selectCommentByPk = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const sentence = comments_query_1.default.select.by.pk;
    const comment = yield database_1.default.query(sentence, [id]);
    if (!comment.rows[0])
        return;
    return {
        id: comment.rows[0].comment_id,
        userId: comment.rows[0].user_id,
        content: comment.rows[0].comment_content,
        reviewId: comment.rows[0].review_id,
        date: comment.rows[0].comment_date
    };
});
exports.selectCommentByPk = selectCommentByPk;
const deleteCommentByPk = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const sentence = comments_query_1.default.delete;
    yield database_1.default.query(sentence, [id]);
});
exports.deleteCommentByPk = deleteCommentByPk;
