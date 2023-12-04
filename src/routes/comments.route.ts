import { Router } from "express"
import { authentication } from "../middlewares/auth.middleware"

const router = Router()

router.use(authentication) // protected route

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
router.post('/')

/* delete comment 
*/
router.delete('/:id')

export default router