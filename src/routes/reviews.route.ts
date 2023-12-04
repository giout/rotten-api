import { Router } from "express"
import { authentication } from "../middlewares/auth.middleware"

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
router.post('/')

/* delete review 
*/
router.delete('/:id')

export default router