import { Router } from "express"

const router = Router()

/* get all movies 
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
router.get('/')

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
router.get('/:id')

export default router