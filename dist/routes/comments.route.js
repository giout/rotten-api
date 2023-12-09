"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const comments_controller_1 = require("../controllers/comments.controller");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authentication); // protected route
/* create comment
req: {
    userId: number,
    reviewId: number,
    content: string
},
res: {
    id: number,
    userId: number,
    reviewId: number,
    content: string,
    date: string
}
*/
router.post('/', comments_controller_1.postComment);
router.route('/:id')
    /* get comment by id
    res: {
        id: number,
        userId: number,
        reviewId: number,
        content: string,
        date: string
    }
    */
    .get(comments_controller_1.getCommentById)
    /* delete comment
    */
    .delete(comments_controller_1.deleteComment);
exports.default = router;
