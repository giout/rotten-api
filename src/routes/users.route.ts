import { Router } from "express"

const router = Router()

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