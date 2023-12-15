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
const shows_api_1 = require("../api/shows.api");
const media_service_1 = require("../services/media.service");
const ratings_service_1 = require("../services/ratings.service");
const reviews_service_1 = require("../services/reviews.service");
const genres_service_1 = require("../services/genres.service");
const url_api_1 = require("../api/url.api");
const mediaGenre_service_1 = require("../services/mediaGenre.service");
const validation_util_1 = require("../utils/validation.util");
const order_util_1 = require("../utils/order.util");
// each page contains 20 entries
const getAllShows = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let request;
        let { search, page, genre, order, year } = req.query;
        if (!page)
            page = '1';
        // find shows in external api
        if (search)
            request = yield (0, shows_api_1.searchShows)(search, page);
        else
            request = yield (0, shows_api_1.discoverShows)({ genre }, page);
        const apiShows = request.results;
        let response = [];
        // each page brings 20 entries
        // in current page, iterate over every entry
        for (const apiShow of apiShows) {
            response.push({
                isTv: false,
                title: apiShow.name,
                overview: apiShow.overview,
                adult: apiShow.adult,
                language: apiShow.original_language,
                date: apiShow.first_air_date || null,
                posterUrl: apiShow.poster_path ? url_api_1.image + apiShow.poster_path : null,
                id: apiShow.id
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
exports.getAllShows = getAllShows;
const getShowById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log(id);
        // verify if show exists in db
        let show = yield (0, media_service_1.selectMediaByPk)(id);
        if (!show) {
            // search show in external api
            const apiShow = yield (0, shows_api_1.findShowDetails)(id);
            const trailer = yield (0, shows_api_1.findShowYTKey)(apiShow.id);
            // store data
            show = yield (0, media_service_1.insertMedia)({
                isTv: false,
                title: apiShow.name,
                overview: apiShow.overview,
                adult: apiShow.adult,
                language: apiShow.original_language,
                date: apiShow.first_air_date || null,
                posterUrl: apiShow.poster_path ? url_api_1.image + apiShow.poster_path : null,
                trailerUrl: trailer ? url_api_1.video + trailer : null,
                id: apiShow.id
            });
            for (const showGenre of apiShow.genres) {
                let genre = yield (0, genres_service_1.selectGenreByPk)(showGenre.id);
                if (!genre)
                    genre = yield (0, genres_service_1.insertGenre)({
                        id: showGenre.id,
                        title: showGenre.name
                    });
                // add genre to show
                yield (0, mediaGenre_service_1.insertMediaGenre)({
                    mediaId: apiShow.id,
                    genreId: genre.id
                });
            }
        }
        // rate by the auth user
        const { user } = req;
        const rating = yield (0, ratings_service_1.selectRatingByPk)({
            userId: user.id,
            mediaId: show === null || show === void 0 ? void 0 : show.id
        });
        let score = 0;
        if (rating)
            score = parseFloat(rating.score);
        const criticStats = yield (0, ratings_service_1.selectRatingsCriticAvgAndCount)(show.id);
        const publicStats = yield (0, ratings_service_1.selectRatingsPublicAvgAndCount)(show.id);
        const response = Object.assign(Object.assign({}, show), { publicRatings: publicStats.ratings, criticRatings: criticStats.ratings, publicScore: publicStats.score, criticScore: criticStats.score, genres: yield (0, mediaGenre_service_1.selectMediaGenres)(show.id), userRate: score });
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
function searchshows(arg0, arg1) {
    throw new Error("Function not implemented.");
}
