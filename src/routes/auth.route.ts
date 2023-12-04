import { Router } from "express"
import { logIn, signUp } from "../controllers/auth.controller"

const router = Router()

/* log in
req: {
    username: string,
    password: string
}
res: {
    token: string
}
*/ 
router.post('/login', logIn)

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
router.post('/signup', signUp)

export default router