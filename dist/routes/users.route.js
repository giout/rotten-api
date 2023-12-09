"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controllers_1 = require("../controllers/users.controllers");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authentication); // protected route
/* get authenticated user
res: {
    username: string,
    firstName: string,
    lastName: string,
    password: string,
    isCritic: boolean
}
*/
router.get('/me', users_controllers_1.getAuthUser);
/* get all users
res: [{
    id: number,
    username: string,
    firstName: string,
    lastName: string,
    password: string,
    ratings: number,
    reviews: number,
    isCritic: boolean
}, ...]
*/
router.get('/', users_controllers_1.getAllUsers);
router.route('/:id')
    /* get user by id
    res: {
        id: number,
        username: string,
        firstName: string,
        lastName: string,
        password: string,
        ratings: number,
        reviews: number,
        isCritic: boolean
    }
    */
    .get(users_controllers_1.getUserById)
    /* update user
    req: {
        username: string, ||
        firstName: string, ||
        lastName: string, ||
        password: string ||
    }
    res: {
        id: number,
        username: string,
        firstName: string,
        lastName: string,
        password: string
    }
    */
    .put(users_controllers_1.putUser)
    /* delete user
    */
    .delete(users_controllers_1.deleteUser);
exports.default = router;
