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
exports.getShowReviews = exports.getShowById = exports.getAllShows = void 0;
const reviews_service_1 = require("../services/reviews.service");
const shows_api_1 = require("../api/shows.api");
const media_service_1 = require("../services/media.service");
const ratings_service_1 = require("../services/ratings.service");
const getAllShows = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { search, page } = req.query;
        if (!page)
            page = '1';
        // find movies in external api
        const request = yield (0, shows_api_1.findShows)(search, page);
        const apiShows = request.results;
        const response = [];
        // each page brings 20 entries
        // in current page, iterate over every entry
        for (const apiShow of apiShows) {
            // verify if movie exists in database
            let movie = yield (0, media_service_1.selectMediaByApiId)(apiShow.id);
            if (!movie) {
                // if it aint, save it
                movie = yield (0, media_service_1.insertMedia)({
                    isTv: true,
                    title: apiShow.original_name,
                    overview: apiShow.overview,
                    adult: apiShow.adult,
                    language: apiShow.original_language,
                    date: apiShow.release_date || null,
                    posterUrl: apiShow.poster_path,
                    trailerUrl: apiShow.backdrop_path,
                    apiId: apiShow.id
                });
            }
            // verify if genre exists, if it aint, insert it
            // calculate:
            const publicRatings = yield (0, ratings_service_1.selectPublicRatings)(movie.media_id);
            const criticRatings = yield (0, ratings_service_1.selectCriticRatings)(movie.media_id);
            const publicScore = yield (0, ratings_service_1.selectPublicScore)(movie.media_id);
            const criticScore = yield (0, ratings_service_1.selectCriticScore)(movie.media_id);
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
                publicRatings,
                criticRatings,
                publicScore,
                criticScore,
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
exports.getAllShows = getAllShows;
const getShowById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // select show in db
        const show = yield (0, media_service_1.selectMediaByPk)(id);
        const publicRatings = yield (0, ratings_service_1.selectPublicRatings)(show.media_id);
        const criticRatings = yield (0, ratings_service_1.selectCriticRatings)(show.media_id);
        const publicScore = yield (0, ratings_service_1.selectPublicScore)(show.media_id);
        const criticScore = yield (0, ratings_service_1.selectCriticScore)(show.media_id);
        const response = {
            id: show.media_id,
            title: show.media_title,
            overview: show.overview,
            adult: show.adult,
            language: show.original_language,
            date: show.release_date,
            posterUrl: show.poster_url,
            trailerUrl: show.trailer_url,
            apiId: show.api_id,
            publicRatings,
            criticRatings,
            publicScore,
            criticScore
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
exports.getShowById = getShowById;
const getShowReviews = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.getShowReviews = getShowReviews;
