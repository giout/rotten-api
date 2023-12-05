import { Router } from "express"
import { authentication } from "../middlewares/auth.middleware"

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
.get()

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
.post()

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
.get()

/* delete review 
*/
.delete()

export default router