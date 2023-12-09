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
exports.selectMediaByPk = exports.insertMedia = exports.selectMediaByApiId = void 0;
const database_1 = __importDefault(require("../config/database"));
const media_query_1 = __importDefault(require("../queries/media.query"));
const selectMediaByApiId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const sentence = media_query_1.default.select.by.apiId;
    const media = yield database_1.default.query(sentence, [id]);
    if (media.rows[0])
        return media.rows[0];
    return;
});
exports.selectMediaByApiId = selectMediaByApiId;
const insertMedia = (entry) => __awaiter(void 0, void 0, void 0, function* () {
    const sentence = media_query_1.default.insert;
    const media = yield database_1.default.query(sentence, [
        entry.isTv,
        entry.title,
        entry.overview,
        entry.adult,
        entry.language,
        entry.date,
        entry.posterUrl,
        entry.trailerUrl,
        entry.apiId
    ]);
    return media.rows[0];
});
exports.insertMedia = insertMedia;
const selectMediaByPk = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const sentence = media_query_1.default.select.by.pk;
    const media = yield database_1.default.query(sentence, [id]);
    if (media.rows[0])
        return media.rows[0];
    return;
});
exports.selectMediaByPk = selectMediaByPk;
