"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const reviews_controller_1 = require("../controllers/reviews.controller");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authentication); // protected route
/* create review
req: {
    userId: number,
    mediaId: number,
    content: string
},
res: {
    id: number,
    userId: number,
    mediaId: number,
    content: string,
    date: string
}
*/
router.post('/', reviews_controller_1.postReview);
router.route('/:id')
    /*  get review by id
    res: {
        id: number,
        userId: number,
        mediaId: number,
        content: string,
        date: string
    }
    */
    .get(reviews_controller_1.getReviewById)
    /* delete review
    */
    .delete(reviews_controller_1.deleteReview);
/* get comments by review
res: [{
    id: number,
    content: string,
    userId: number,
    reviewId: number,
    date: string
}]
*/
router.get('/:id/comments', reviews_controller_1.getReviewComments);
exports.default = router;
