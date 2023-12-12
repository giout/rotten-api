import { Request, Response, NextFunction } from "express"
import { selectReviewsByMedia } from "../services/reviews.service"
import { findShows, getShowDetails, getShowYTKey } from "../api/shows.api"
import { insertMedia, selectMediaByApiId, selectMediaByPk } from "../services/media.service"
import { selectCriticRatings, selectCriticScore, selectPublicRatings, selectPublicScore, selectRatingByPk } from "../services/ratings.service"
import { image, video } from "../api/url.api"
import { insertGenre, selectGenreByApiId } from "../services/genres.service"
import { insertMediaGenre, selectMediaGenres } from "../services/mediaGenre.service"
import { mediaExists } from "../utils/validation.util"
import { filterMediaByGenre, filterMediaByYear, orderMedia } from "../utils/filter.util"
import { AuthRequest } from "../types/auth.type"

export const getAllShows = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { search, page, year, genre, order } = req.query
        if (!page) page = '1'

        // find shows in external api
        const request = await findShows(<string> search, <string> page)
        const apiShows = request.results
        let response = []

        // each page brings 20 entries
        // in current page, iterate over every entry
        for (const apiShow of apiShows) {
            // verify if show exists in database
            let show = await selectMediaByApiId(apiShow.id)
            if (!show) {
                const trailer = await getShowYTKey(apiShow.id)

                // if it aint, save it
                show = await insertMedia({
                    isTv: true,
                    title: apiShow.original_name,
                    overview: apiShow.overview,
                    adult: apiShow.adult,
                    language: apiShow.original_language,
                    date: apiShow.first_air_date || null, 
                    posterUrl: image + apiShow.poster_path,
                    trailerUrl: video + trailer,
                    apiId: apiShow.id
                })
                
                const details = await getShowDetails(apiShow.id)
                for (const apiGenre of details.genres) {
                    let genre = await selectGenreByApiId(apiGenre.id)
                    if (!genre)
                        genre = await insertGenre({
                            apiId: apiGenre.id,
                            title: apiGenre.name
                        })

                    // add genre to show
                    await insertMediaGenre({ 
                        mediaId: show.id, 
                        genreId: genre.id
                    })
                }
            }
            
            response.push({
                ...show,
                publicRatings: await selectPublicRatings(show.id) ,
                criticRatings: await selectCriticRatings(show.id),
                publicScore: await selectPublicScore(show.id),
                criticScore: await selectCriticScore(show.id),
                genres: await selectMediaGenres(show.id)
            })
        }

        if (year)
            response = filterMediaByYear(response, <string> year)

        if (genre)
            response = filterMediaByGenre(response, <string> genre)
    
        if (order)
            response = orderMedia(response, <string> order)
        
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
        const show = await mediaExists(id)
        // rating by the auth user
        const { user } = (req as AuthRequest)
        const rating = await selectRatingByPk({ 
            userId: user.id, 
            mediaId: show.id 
        })            
        let score = 0
        if (rating)
            score = parseFloat(rating.score)


        const response = {
            ...show,
            publicRatings: await selectPublicRatings(show.id) ,
            criticRatings: await selectCriticRatings(show.id),
            publicScore: await selectPublicScore(show.id),
            criticScore: await selectCriticScore(show.id),
            genres: await selectMediaGenres(show.id),
            userRate: score
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
        await mediaExists(id)
        const reviews = await selectReviewsByMedia(id)
        
        res.status(200).json({
            code: 200,
            data: reviews
        })
    } catch(e) {
        next(e)
    }
}

