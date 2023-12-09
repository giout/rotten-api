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
exports.selectMediaGenres = exports.insertMediaGenre = void 0;
const database_1 = __importDefault(require("../config/database"));
const mediaGenre_query_1 = __importDefault(require("../queries/mediaGenre.query"));
const insertMediaGenre = (entry) => __awaiter(void 0, void 0, void 0, function* () {
    const sentence = mediaGenre_query_1.default.insert;
    const result = yield database_1.default.query(sentence, [entry.mediaId, entry.genreId]);
    return result.rows[0];
});
exports.insertMediaGenre = insertMediaGenre;
const selectMediaGenres = (mediaId) => __awaiter(void 0, void 0, void 0, function* () {
    const sentence = mediaGenre_query_1.default.select.by.media;
    const result = yield database_1.default.query(sentence, [mediaId]);
    return result.rows.map(r => r.genre_title);
});
exports.selectMediaGenres = selectMediaGenres;
