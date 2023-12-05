import { Router } from "express"
import { authentication } from "../middlewares/auth.middleware"
import { getAllShows, getShowById } from "../controllers/shows.controller"

const router = Router()

router.use(authentication) // protected route

/* get all shows 
res: [{
    id: number,
    title: string,
    overview: string,
    adult: boolean,
    language: string,
    date: string,
    posterUrl: string,
    trailerUrl: string,
    publicRatings: number,
    criticRatings: number,
    publicScore: number,
    criticScore: number
}, ...]
*/
router.get('/', getAllShows)

/* get show by id 
res: {
    id: number,
    title: string,
    overview: string,
    adult: boolean,
    language: string,
    date: string,
    posterUrl: string,
    trailerUrl: string,
    publicRatings: number,
    criticRatings: number,
    publicScore: number,
    criticScore: number
}
*/
router.get('/:id', getShowById)

export default router