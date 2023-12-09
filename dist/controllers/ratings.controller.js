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
exports.postRating = void 0;
const ratings_service_1 = require("../services/ratings.service");
const postRating = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, mediaId, score } = req.body;
        // verify if rating already exists
        const rating = yield (0, ratings_service_1.selectRatingByPk)(req.body);
        // if rating exists, it is deleted
        if (rating)
            yield (0, ratings_service_1.deleteRating)(req.body);
        const createdRating = yield (0, ratings_service_1.insertRating)(req.body);
        res.status(201).json({
            code: 201,
            data: createdRating
        });
    }
    catch (e) {
        next(e);
    }
});
exports.postRating = postRating;
