import { Request, Response, NextFunction } from "express"
import { selectReviewsByMedia } from "../services/reviews.service"
import { findShows } from "../api/shows.api"
import { insertMedia, selectMediaByApiId, selectMediaByPk } from "../services/media.service"
import { selectCriticRatings, selectCriticScore, selectPublicRatings, selectPublicScore } from "../services/ratings.service"

export const getAllShows = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { search, page } = req.query
        if (!page) page = '1'

        // find movies in external api
        const request = await findShows(<string> search, <string> page)
        const apiShows = request.results
        const response = []

        // each page brings 20 entries
        // in current page, iterate over every entry
        for (const apiShow of apiShows) {
            // verify if movie exists in database
            let movie = await selectMediaByApiId(apiShow.id)
            if (!movie) {
                // if it aint, save it
                movie = await insertMedia({
                    isTv: true,
                    title: apiShow.original_name,
                    overview: apiShow.overview,
                    adult: apiShow.adult,
                    language: apiShow.original_language,
                    date: apiShow.release_date || null, 
                    posterUrl: apiShow.poster_path,
                    trailerUrl: apiShow.backdrop_path,
                    apiId: apiShow.id
                })
            }

            // verify if genre exists, if it aint, insert it

            // calculate:
            const publicRatings = await selectPublicRatings(movie.media_id) 
            const criticRatings = await selectCriticRatings(movie.media_id)
            const publicScore = await selectPublicScore(movie.media_id)
            const criticScore = await selectCriticScore(movie.media_id)

            response.push({
                id: movie.media_id,
                title: movie.media_title,
                overview: movie.overview,
                adult: movie.adult,
                language: movie.original_language,
                date: movie.release_date,
                posterUrl: movie.poster_url,
                trailerUrl: movie.trailer_url,
                apiId: movie.api_id,
                publicRatings,
                criticRatings,
                publicScore,
                criticScore,
            })
        }
        
        res.status(200).json({
            code: 200,
            data: response
        })

    } catch(e) {
        next(e)
    }
}

export const getShowById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        // select show in db
        const show = await selectMediaByPk(id)

        const publicRatings = await selectPublicRatings(show.media_id) 
        const criticRatings = await selectCriticRatings(show.media_id)
        const publicScore = await selectPublicScore(show.media_id)
        const criticScore = await selectCriticScore(show.media_id)
        
        const response = {
            id: show.media_id,
            title: show.media_title,
            overview: show.overview,
            adult: show.adult,
            language: show.original_language,
            date: show.release_date,
            posterUrl: show.poster_url,
            trailerUrl: show.trailer_url,
            apiId: show.api_id,
            publicRatings,
            criticRatings,
            publicScore,
            criticScore
        }
        
        res.status(200).json({
            code: 200,
            data: response
        })

    } catch(e) {
        next(e)
    }
}

export const getShowReviews = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const reviews = await selectReviewsByMedia(id)
        
        res.status(200).json({
            code: 200,
            data: reviews
        })
    } catch(e) {
        next(e)
    }
}

