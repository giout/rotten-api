import { Router } from "express"
import { authentication } from "../middlewares/auth.middleware"
import { getAllMovies, getMovieById, getMovieReviews } from "../controllers/movies.controller"

const router = Router()

router.use(authentication) // protected route

/* get all movies 
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
router.get('/', getAllMovies)

/* get movie by id 
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
router.get('/:id', getMovieById)

/* get reviews by movie
res: [{
    id: number,
    content: string,
    userId: number,
    movieId: number,
    date: string
}]
*/
router.get('/:id/reviews', getMovieReviews)

export default router