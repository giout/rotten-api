import { Router } from "express"
import { authentication } from "../middlewares/auth.middleware"
import { getAllGenres, getGenreById } from "../controllers/genres.controller"

const router = Router()

router.use(authentication) // protected route

/* get all genres 
res: [{
    id: number,
    title: string
}, ...]
*/
router.get('/', getAllGenres)


/* get genre by id 
res: {
    id: number, 
    title: string
}
*/
router.get('/:id', getGenreById)

export default router