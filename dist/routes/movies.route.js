"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const movies_controller_1 = require("../controllers/movies.controller");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authentication); // protected route
/* get all movies
query -> search, page
res: [{
    id: number,
    title: string,
    overview: string,
    adult: boolean,
    language: string,
    date: string,
    posterUrl: string,
    trailerUrl: string,
    publicRatings: number,
    criticRatings: number,
    publicScore: number,
    criticScore: number
}, ...]
*/
router.get('/', movies_controller_1.getAllMovies);
/* get movie by id
res: {
    id: number,
    title: string,
    overview: string,
    adult: boolean,
    language: string,
    date: string,
    posterUrl: string,
    trailerUrl: string,
    publicRatings: number,
    criticRatings: number,
    publicScore: number,
    criticScore: number
}
*/
router.get('/:id', movies_controller_1.getMovieById);
/* get reviews by movie
res: [{
    id: number,
    content: string,
    userId: number,
    movieId: number,
    date: string
}]
*/
router.get('/:id/reviews', movies_controller_1.getMovieReviews);
exports.default = router;
