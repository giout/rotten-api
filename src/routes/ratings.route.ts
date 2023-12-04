import { Router } from "express"
import { authentication } from "../middlewares/auth.middleware"

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
router.post('/')

export default router