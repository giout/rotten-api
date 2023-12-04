import { Router } from "express"

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
router.post('/login')

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
router.post('/signup')

export default router