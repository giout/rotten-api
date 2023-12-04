import { Router } from "express"
import { authentication } from "../middlewares/auth.middleware"

const router = Router()

router.use(authentication) // protected route

router.route('/')
/* get all genres 
res: [{
    id: number,
    title: string
}, ...]
*/
.get()

/* create genre
req: {
    title: string
},
res: {
    id: number,
    title: string
}
*/
.post()

/* get genre by id 
res: {
    id: number, 
    title: string
}
*/
router.get('/:id')

export default router