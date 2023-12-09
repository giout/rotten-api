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
exports.findShowGenres = exports.findMovieGenres = void 0;
require("dotenv/config");
const axios_util_1 = require("../utils/axios.util");
const api = 'https://api.themoviedb.org/3';
const key = process.env.API_KEY;
const headers = { 'Content-Type': 'application/json' };
// each page contains 20 entries
const findMovieGenres = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = api + '/genre/movie/list';
    const request = yield (0, axios_util_1.getRequest)(url, headers, {
        api_key: key
    });
    // convert array into map
    const map = new Map();
    request.genres.map((genre) => {
        map.set(genre.id, genre.name);
    });
    return map;
});
exports.findMovieGenres = findMovieGenres;
const findShowGenres = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = api + '/genre/tv/list';
    const request = yield (0, axios_util_1.getRequest)(url, headers, {
        api_key: key
    });
    // convert array into map
    const map = new Map();
    request.genres.map((genre) => {
        map.set(genre.id, genre.name);
    });
    return map;
});
exports.findShowGenres = findShowGenres;
