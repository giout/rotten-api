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
exports.getGenreById = exports.getAllGenres = void 0;
const genres_service_1 = require("../services/genres.service");
const validation_util_1 = require("../utils/validation.util");
const getAllGenres = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const genres = yield (0, genres_service_1.selectAllGenres)();
        res.status(200).json({
            code: 200,
            data: genres
        });
    }
    catch (e) {
        next(e);
    }
});
exports.getAllGenres = getAllGenres;
const getGenreById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const genre = yield (0, validation_util_1.genreExists)(id);
        res.status(200).json({
            code: 200,
            data: genre
        });
    }
    catch (e) {
        next(e);
    }
});
exports.getGenreById = getGenreById;
