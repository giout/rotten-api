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
exports.getMovieReviews = exports.getMovieById = exports.getAllMovies = void 0;
const movies_api_1 = require("../api/movies.api");
const media_service_1 = require("../services/media.service");
const ratings_service_1 = require("../services/ratings.service");
const reviews_service_1 = require("../services/reviews.service");
const genres_service_1 = require("../services/genres.service");
const url_api_1 = require("../api/url.api");
const mediaGenre_service_1 = require("../services/mediaGenre.service");
const validation_util_1 = require("../utils/validation.util");
const order_util_1 = require("../utils/order.util");
// each page contains 20 entries
const getAllMovies = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let request;
        let { search, page, genre, order, year } = req.query;
        if (!page)
            page = '1';
        // find movies in external api
        if (search)
            request = yield (0, movies_api_1.searchMovies)(search, page);
        else
            request = yield (0, movies_api_1.discoverMovies)({ genre, year }, page);
        const apiMovies = request.results;
        let response = [];
        // each page brings 20 entries
        // in current page, iterate over every entry
        for (const apiMovie of apiMovies) {
            response.push({
                isTv: false,
                title: apiMovie.original_title,
                overview: apiMovie.overview,
                adult: apiMovie.adult,
                language: apiMovie.original_language,
                date: apiMovie.release_date || null,
                posterUrl: url_api_1.image + apiMovie.poster_path,
                id: apiMovie.id
            });
        }
        if (order)
            response = (0, order_util_1.orderMedia)(response, order);
        res.status(200).json({
            code: 200,
            data: response
        });
    }
    catch (e) {
        next(e);
    }
});
exports.getAllMovies = getAllMovies;
const getMovieById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // verify if movie exists in db
        let movie = yield (0, media_service_1.selectMediaByPk)(id);
        if (!movie) {
            // search movie in external api
            const apiMovie = yield (0, movies_api_1.findMovieDetails)(id);
            const trailer = yield (0, movies_api_1.findMovieYTKey)(apiMovie.id);
            // store data
            movie = yield (0, media_service_1.insertMedia)({
                isTv: false,
                title: apiMovie.original_title,
                overview: apiMovie.overview,
                adult: apiMovie.adult,
                language: apiMovie.original_language,
                date: apiMovie.release_date || null,
                posterUrl: url_api_1.image + apiMovie.poster_path,
                trailerUrl: url_api_1.video + trailer,
                id: apiMovie.id
            });
            for (const movieGenre of apiMovie.genres) {
                let genre = yield (0, genres_service_1.selectGenreByPk)(movieGenre.id);
                if (!genre)
                    genre = yield (0, genres_service_1.insertGenre)({
                        id: movieGenre.id,
                        title: movieGenre.name
                    });
                // add genre to movie
                yield (0, mediaGenre_service_1.insertMediaGenre)({
                    mediaId: apiMovie.id,
                    genreId: genre.id
                });
            }
        }
        // rate by the auth user
        const { user } = req;
        const rating = yield (0, ratings_service_1.selectRatingByPk)({
            userId: user.id,
            mediaId: movie === null || movie === void 0 ? void 0 : movie.id
        });
        let score = 0;
        if (rating)
            score = parseFloat(rating.score);
        const criticStats = yield (0, ratings_service_1.selectRatingsCriticAvgAndCount)(movie.id);
        const publicStats = yield (0, ratings_service_1.selectRatingsPublicAvgAndCount)(movie.id);
        const response = Object.assign(Object.assign({}, movie), { publicRatings: publicStats.ratings, criticRatings: criticStats.ratings, publicScore: publicStats.score, criticScore: criticStats.score, genres: yield (0, mediaGenre_service_1.selectMediaGenres)(movie.id), userRate: score });
        res.status(200).json({
            code: 200,
            data: response
        });
    }
    catch (e) {
        next(e);
    }
});
exports.getMovieById = getMovieById;
const getMovieReviews = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, validation_util_1.mediaExists)(id);
        const reviews = yield (0, reviews_service_1.selectReviewsByMedia)(id);
        res.status(200).json({
            code: 200,
            data: reviews
        });
    }
    catch (e) {
        next(e);
    }
});
exports.getMovieReviews = getMovieReviews;
