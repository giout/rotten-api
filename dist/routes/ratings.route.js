"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const ratings_controller_1 = require("../controllers/ratings.controller");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authentication); // protected route
/* rate
req: {
    userId: number,
    mediaId: number,
    score: string
}

res: {
    userId: number,
    mediaId: number,
    score: string
}
*/
router.post('/', ratings_controller_1.postRating);
exports.default = router;
