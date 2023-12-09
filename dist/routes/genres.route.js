"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const genres_controller_1 = require("../controllers/genres.controller");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authentication); // protected route
/* get all genres
res: [{
    id: number,
    title: string
}, ...]
*/
router.get('/', genres_controller_1.getAllGenres);
/* get genre by id
res: {
    id: number,
    title: string
}
*/
router.get('/:id', genres_controller_1.getGenreById);
exports.default = router;
