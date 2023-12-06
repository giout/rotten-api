import { Router } from "express"
import { authentication } from "../middlewares/auth.middleware"
import { getAllShows, getShowById, getShowReviews } from "../controllers/shows.controller"

const router = Router()

router.use(authentication) // protected route

/* get all shows 
query -> search, page
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

/* get reviews by show
res: [{
    id: number,
    content: string,
    userId: number,
    showId: number,
    date: string
}]
*/
router.get('/:id/reviews', getShowReviews)

export default router