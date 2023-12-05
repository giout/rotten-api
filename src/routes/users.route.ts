import { Router } from "express"
import { getAuthUser } from "../controllers/users.controllers"
import { authentication } from "../middlewares/auth.middleware"

const router = Router()

router.use(authentication) // protected route

/* get authenticated user 
res: {
    username: string,
    firstName: string,
    lastName: string,
    password: string,
    isCritic: boolean
}
*/
router.get('/me', getAuthUser)

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
router.get('/')

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
.get()

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
.put()

/* delete user
*/
.delete()

export default router