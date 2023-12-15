import { Request, Response, NextFunction } from "express"
import { discoverShows, findShowDetails, findShowYTKey, searchShows } from "../api/shows.api"
import { insertMedia, selectMediaByPk } from "../services/media.service"
import { selectRatingByPk, selectRatingsCriticAvgAndCount, selectRatingsPublicAvgAndCount } from "../services/ratings.service"
import { selectReviewsByMedia } from "../services/reviews.service"
import { insertGenre, selectGenreByPk } from "../services/genres.service"
import { image, video } from "../api/url.api"
import { insertMediaGenre, selectMediaGenres } from "../services/mediaGenre.service"
import { mediaExists } from "../utils/validation.util"
import { orderMedia } from "../utils/order.util"
import { AuthRequest } from "../types/auth.type"

// each page contains 20 entries
export const getAllShows = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let request
        let { search, page, genre, order, year } = req.query
        if (!page) page = '1'

        // find shows in external api
        if (search)
            request = await searchShows(<string> search, <string> page)
        else
            request = await discoverShows({genre}, <string> page)

        const apiShows = request.results
        let response = []

        // each page brings 20 entries
        // in current page, iterate over every entry
        for (const apiShow of apiShows) {
            response.push({
                isTv: false,
                title: apiShow.name,
                overview: apiShow.overview,
                adult: apiShow.adult,
                language: apiShow.original_language,
                date: apiShow.first_air_date || null, 
                posterUrl:  apiShow.poster_path ? image + apiShow.poster_path : null,
                id: apiShow.id
            })
        }
        
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
        console.log(id)
        // verify if show exists in db
        let show: any = await selectMediaByPk(id)
        if (!show) {
            // search show in external api
            const apiShow = await findShowDetails(<string>id)
            const trailer = await findShowYTKey(apiShow.id)
            // store data
            show = await insertMedia({
                isTv: false,
                title: apiShow.name,
                overview: apiShow.overview,
                adult: apiShow.adult,
                language: apiShow.original_language,
                date: apiShow.first_air_date || null, 
                posterUrl: apiShow.poster_path ? image + apiShow.poster_path : null,
                trailerUrl: trailer ? video + trailer : null,
                id: apiShow.id
            })

            for (const showGenre of apiShow.genres) {
                let genre = await selectGenreByPk(showGenre.id)
                if (!genre) 
                    genre = await insertGenre({
                        id: showGenre.id,
                        title: showGenre.name
                    })

                // add genre to show
                await insertMediaGenre({ 
                    mediaId: apiShow.id, 
                    genreId: genre.id
                })
            }
        }

        // rate by the auth user
        const { user } = (req as AuthRequest)
        const rating = await selectRatingByPk({ 
            userId: user.id, 
            mediaId: show?.id 
        })            
        let score = 0
        if (rating)
            score = parseFloat(rating.score)

        const criticStats = await selectRatingsCriticAvgAndCount(show.id)
        const publicStats = await selectRatingsPublicAvgAndCount(show.id)

        const response = {
            ...show,
            publicRatings: publicStats.ratings,
            criticRatings: criticStats.ratings,
            publicScore: publicStats.score,
            criticScore: criticStats.score,
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

function searchshows(arg0: string, arg1: string): any {
    throw new Error("Function not implemented.")
}

