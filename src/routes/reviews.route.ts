import { Router } from "express"
import { authentication } from "../middlewares/auth.middleware"
import { deleteReview, getAllReviews, getReviewById, postReview } from "../controllers/reviews.controller"

const router = Router()

router.use(authentication) // protected route

router.route('/')
/* get all reviews 
res: [{
    id: number,
    userId: number,
    mediaId: number,
    content: string,
    date: string
}, ...]
*/
.get(getAllReviews)

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
.post(postReview)

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