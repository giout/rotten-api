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
const url_api_1 = require("../api/url.api");
const genres_service_1 = require("../services/genres.service");
const mediaGenre_service_1 = require("../services/mediaGenre.service");
const validation_util_1 = require("../utils/validation.util");
const filter_util_1 = require("../utils/filter.util");
const getAllShows = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let request;
        let { search, page, year, genre, order } = req.query;
        if (!page)
            page = '1';
        // find shows in external api
        if (genre)
            genre = yield (0, genres_service_1.selectGenreApiIdByPk)(genre);
        // find movies in external api
        if (search)
            request = yield (0, shows_api_1.searchShows)(search, page);
        else
            request = yield (0, shows_api_1.discoverShows)({ genre, year }, page);
        const apiShows = request.results;
        let response = [];
        // each page brings 20 entries
        // in current page, iterate over every entry
        for (const apiShow of apiShows) {
            // verify if show exists in database
            let show = yield (0, media_service_1.selectMediaByApiId)(apiShow.id);
            if (!show) {
                const trailer = yield (0, shows_api_1.findShowYTKey)(apiShow.id);
                // if it aint, save it
                show = yield (0, media_service_1.insertMedia)({
                    isTv: true,
                    title: apiShow.original_name,
                    overview: apiShow.overview,
                    adult: apiShow.adult,
                    language: apiShow.original_language,
                    date: apiShow.first_air_date || null,
                    posterUrl: url_api_1.image + apiShow.poster_path,
                    trailerUrl: url_api_1.video + trailer,
                    apiId: apiShow.id
                });
                const details = yield (0, shows_api_1.findShowDetails)(apiShow.id);
                for (const apiGenre of details.genres) {
                    let genre = yield (0, genres_service_1.selectGenreByApiId)(apiGenre.id);
                    if (!genre)
                        genre = yield (0, genres_service_1.insertGenre)({
                            apiId: apiGenre.id,
                            title: apiGenre.name
                        });
                    // add genre to show
                    yield (0, mediaGenre_service_1.insertMediaGenre)({
                        mediaId: show.id,
                        genreId: genre.id
                    });
                }
            }
            response.push(Object.assign(Object.assign({}, show), { publicRatings: yield (0, ratings_service_1.selectPublicRatings)(show.id), criticRatings: yield (0, ratings_service_1.selectCriticRatings)(show.id), publicScore: yield (0, ratings_service_1.selectPublicScore)(show.id), criticScore: yield (0, ratings_service_1.selectCriticScore)(show.id), genres: yield (0, mediaGenre_service_1.selectMediaGenres)(show.id) }));
        }
        if (year && search)
            response = (0, filter_util_1.filterMediaByYear)(response, year);
        if (genre && search)
            response = (0, filter_util_1.filterMediaByGenre)(response, genre);
        if (order)
            response = (0, filter_util_1.orderMedia)(response, order);
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
        const show = yield (0, validation_util_1.mediaExists)(id);
        // rating by the auth user
        const { user } = req;
        const rating = yield (0, ratings_service_1.selectRatingByPk)({
            userId: user.id,
            mediaId: show.id
        });
        let score = 0;
        if (rating)
            score = parseFloat(rating.score);
        const response = Object.assign(Object.assign({}, show), { publicRatings: yield (0, ratings_service_1.selectPublicRatings)(show.id), criticRatings: yield (0, ratings_service_1.selectCriticRatings)(show.id), publicScore: yield (0, ratings_service_1.selectPublicScore)(show.id), criticScore: yield (0, ratings_service_1.selectCriticScore)(show.id), genres: yield (0, mediaGenre_service_1.selectMediaGenres)(show.id), userRate: score });
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
exports.getShowReviews = getShowReviews;
