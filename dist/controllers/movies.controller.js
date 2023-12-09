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
// each page contains 20 entries
const getAllMovies = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { search, page } = req.query;
        if (!page)
            page = '1';
        // find movies in external api
        const request = yield (0, movies_api_1.findMovies)(search, page);
        const apiMovies = request.results;
        const response = [];
        // each page brings 20 entries
        // in current page, iterate over every entry
        for (const apiMovie of apiMovies) {
            // verify if movie exists in database
            let movie = yield (0, media_service_1.selectMediaByApiId)(apiMovie.id);
            if (!movie) {
                const trailer = yield (0, movies_api_1.getMovieYTKey)(apiMovie.id);
                // if it aint, save it
                movie = yield (0, media_service_1.insertMedia)({
                    isTv: false,
                    title: apiMovie.original_title,
                    overview: apiMovie.overview,
                    adult: apiMovie.adult,
                    language: apiMovie.original_language,
                    date: apiMovie.release_date || null,
                    posterUrl: url_api_1.image + apiMovie.poster_path,
                    trailerUrl: url_api_1.video + trailer,
                    apiId: apiMovie.id
                });
                const details = yield (0, movies_api_1.getMovieDetails)(apiMovie.id);
                for (const apiGenre of details.genres) {
                    let genre = yield (0, genres_service_1.selectGenreByApiId)(apiGenre.id);
                    if (!genre)
                        genre = yield (0, genres_service_1.insertGenre)({
                            apiId: apiGenre.id,
                            title: apiGenre.name
                        });
                    // add genre to movie
                    yield (0, mediaGenre_service_1.insertMediaGenre)({
                        mediaId: movie.media_id,
                        genreId: genre.genre_id
                    });
                }
            }
            // add to response movie genre
            response.push({
                id: movie.media_id,
                title: movie.media_title,
                overview: movie.overview,
                adult: movie.adult,
                language: movie.original_language,
                date: movie.release_date,
                posterUrl: movie.poster_url,
                trailerUrl: movie.trailer_url,
                apiId: movie.api_id,
                publicRatings: yield (0, ratings_service_1.selectPublicRatings)(movie.media_id),
                criticRatings: yield (0, ratings_service_1.selectCriticRatings)(movie.media_id),
                publicScore: yield (0, ratings_service_1.selectPublicScore)(movie.media_id),
                criticScore: yield (0, ratings_service_1.selectCriticScore)(movie.media_id),
                genres: yield (0, mediaGenre_service_1.selectMediaGenres)(movie.media_id)
            });
        }
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
        // select movie in db
        const movie = yield (0, media_service_1.selectMediaByPk)(id);
        const response = {
            id: movie.media_id,
            title: movie.media_title,
            overview: movie.overview,
            adult: movie.adult,
            language: movie.original_language,
            date: movie.release_date,
            posterUrl: movie.poster_url,
            trailerUrl: movie.trailer_url,
            apiId: movie.api_id,
            publicRatings: yield (0, ratings_service_1.selectPublicRatings)(movie.media_id),
            criticRatings: yield (0, ratings_service_1.selectCriticRatings)(movie.media_id),
            publicScore: yield (0, ratings_service_1.selectPublicScore)(movie.media_id),
            criticScore: yield (0, ratings_service_1.selectCriticScore)(movie.media_id),
            genres: yield (0, mediaGenre_service_1.selectMediaGenres)(movie.media_id)
        };
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
