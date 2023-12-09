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
exports.deleteComment = exports.getCommentById = exports.postComment = void 0;
const comments_service_1 = require("../services/comments.service");
const postComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, reviewId, content } = req.body;
        const comment = yield (0, comments_service_1.createComment)(req.body);
        res.status(201).json({
            code: 201,
            data: comment
        });
    }
    catch (e) {
        next(e);
    }
});
exports.postComment = postComment;
const getCommentById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const comment = yield (0, comments_service_1.selectCommentByPk)(id);
        res.status(200).json({
            code: 200,
            data: comment
        });
    }
    catch (e) {
        next(e);
    }
});
exports.getCommentById = getCommentById;
const deleteComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, comments_service_1.deleteCommentByPk)(id);
        res.status(201).json({
            code: 200
        });
    }
    catch (e) {
        next(e);
    }
});
exports.deleteComment = deleteComment;
