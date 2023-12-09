"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
/* log in
req: {
    username: string,
    password: string
}
res: {
    token: string
}
*/
router.post('/login', auth_controller_1.logIn);
/* sign up
req: {
    username: string,
    firstName: string,
    lastName: string,
    password: string,
    isCritic: boolean
}
res: {
    id: number,
    username: string,
    firstName: string,
    lastName: string,
    password: string,
    isCritic: boolean
}
*/
router.post('/signup', auth_controller_1.signUp);
exports.default = router;
