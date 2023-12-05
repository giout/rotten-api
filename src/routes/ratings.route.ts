import { Router } from "express"
import { authentication } from "../middlewares/auth.middleware"
import { postRating } from "../controllers/ratings.controller"

const router = Router()

router.use(authentication) // protected route

/* rate
req: {
    userId: number,
    mediaId: number,
    score: string
}

res: {
    userId: number,
    mediaId: number,
    score: string
}
*/
router.post('/', postRating)

export default router