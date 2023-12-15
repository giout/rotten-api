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
exports.findMovieDetails = exports.findMovieYTKey = exports.discoverMovies = exports.searchMovies = void 0;
require("dotenv/config");
const axios_util_1 = require("../utils/axios.util");
const api = 'https://api.themoviedb.org/3';
const key = process.env.API_KEY;
const headers = { 'Content-Type': 'application/json' };
const searchMovies = (query, page) => __awaiter(void 0, void 0, void 0, function* () {
    const url = api + '/search/movie';
    const request = yield (0, axios_util_1.getRequest)(url, headers, {
        api_key: key,
        query,
        page
    });
    return request;
});
exports.searchMovies = searchMovies;
const discoverMovies = (entry, page) => __awaiter(void 0, void 0, void 0, function* () {
    const params = { api_key: key, page };
    if (entry.genre)
        params.with_genres = entry.genre;
    if (entry.year)
        params.primary_release_year = entry.year;
    const url = api + '/discover/movie';
    const request = yield (0, axios_util_1.getRequest)(url, headers, params);
    return request;
});
exports.discoverMovies = discoverMovies;
const findMovieYTKey = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const url = api + `/movie/${id}/videos`;
    const request = yield (0, axios_util_1.getRequest)(url, headers, {
        api_key: key
    });
    if (!request.results[0])
        return null;
    return request.results[0].key;
});
exports.findMovieYTKey = findMovieYTKey;
const findMovieDetails = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const url = api + `/movie/${id}`;
    const request = yield (0, axios_util_1.getRequest)(url, headers, {
        api_key: key
    });
    return request;
});
exports.findMovieDetails = findMovieDetails;
