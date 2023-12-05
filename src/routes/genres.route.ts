import { Router } from "express"
import { authentication } from "../middlewares/auth.middleware"
import { getAllGenres, getGenreById, postGenre } from "../controllers/genres.controller"

const router = Router()

router.use(authentication) // protected route

router.route('/')
/* get all genres 
res: [{
    id: number,
    title: string
}, ...]
*/
.get(getAllGenres)

/* create genre
req: {
    title: string
},
res: {
    id: number,
    title: string
}
*/
.post(postGenre)

/* get genre by id 
res: {
    id: number, 
    title: string
}
*/
router.get('/:id', getGenreById)

export default router