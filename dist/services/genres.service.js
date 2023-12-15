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
exports.selectGenreApiIdByPk = exports.selectGenreByApiId = exports.selectGenreByPk = exports.insertGenre = exports.selectAllGenres = void 0;
const genres_query_1 = __importDefault(require("../queries/genres.query"));
const database_1 = __importDefault(require("../config/database"));
const selectAllGenres = () => __awaiter(void 0, void 0, void 0, function* () {
    const sentence = genres_query_1.default.select.any;
    const genres = yield database_1.default.query(sentence, []);
    const response = [];
    genres.rows.map(genre => {
        response.push({
            id: genre.genre_id,
            title: genre.genre_title
        });
    });
    return response;
});
exports.selectAllGenres = selectAllGenres;
const insertGenre = (entry) => __awaiter(void 0, void 0, void 0, function* () {
    const sentence = genres_query_1.default.insert;
    const genre = yield database_1.default.query(sentence, [entry.title, entry.id]);
    return {
        id: genre.rows[0].genre_id,
        title: genre.rows[0].genre_title
    };
});
exports.insertGenre = insertGenre;
const selectGenreByPk = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const sentence = genres_query_1.default.select.by.pk;
    const genre = yield database_1.default.query(sentence, [id]);
    if (!genre.rows[0])
        return;
    return {
        id: genre.rows[0].genre_id,
        title: genre.rows[0].genre_title
    };
});
exports.selectGenreByPk = selectGenreByPk;
const selectGenreByApiId = (apiId) => __awaiter(void 0, void 0, void 0, function* () {
    const sentence = genres_query_1.default.select.by.apiId;
    const genre = yield database_1.default.query(sentence, [apiId]);
    if (!genre.rows[0])
        return;
    return {
        id: genre.rows[0].genre_id,
        title: genre.rows[0].genre_title
    };
});
exports.selectGenreByApiId = selectGenreByApiId;
const selectGenreApiIdByPk = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const sentence = genres_query_1.default.select.by.pk;
    const genre = yield database_1.default.query(sentence, [id]);
    if (!genre.rows[0])
        return;
    return genre.rows[0].genre_api_id;
});
exports.selectGenreApiIdByPk = selectGenreApiIdByPk;
