"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const shows_controller_1 = require("../controllers/shows.controller");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authentication); // protected route
/* get all shows
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
router.get('/', shows_controller_1.getAllShows);
/* get show by id
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
router.get('/:id', shows_controller_1.getShowById);
/* get reviews by show
res: [{
    id: number,
    content: string,
    userId: number,
    showId: number,
    date: string
}]
*/
router.get('/:id/reviews', shows_controller_1.getShowReviews);
exports.default = router;
