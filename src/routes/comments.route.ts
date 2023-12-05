import { Router } from "express"
import { authentication } from "../middlewares/auth.middleware"

const router = Router()

router.use(authentication) // protected route

router.route('/')

/* get all comments
res: [{
    id: number,
    userId: number,
    reviewId: number,
    content: string,
    date: string
}, ...]
*/
.get()

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
.post()

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
.get()

/* delete comment 
*/
.delete()

export default router