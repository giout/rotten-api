import { Router } from "express"
import { authentication } from "../middlewares/auth.middleware"
import { deleteReview, getReviewById, postReview } from "../controllers/reviews.controller"

const router = Router()

router.use(authentication) // protected route

/* create review 
req: {
    userId: number,
    mediaId: number,
    content: string
},
res: {
    id: number,
    userId: number,
    mediaId: number,
    content: string,
    date: string
}
*/
router.post('/', postReview)

router.route('/:id')
/*  get review by id
res: {
    id: number,
    userId: number,
    mediaId: number,
    content: string,
    date: string
}
*/
.get(getReviewById)

/* delete review 
*/
.delete(deleteReview)

export default router