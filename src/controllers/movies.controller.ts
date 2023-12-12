import { Request, Response, NextFunction } from "express"
import { findMovies, getMovieDetails, getMovieYTKey } from "../api/movies.api"
import { insertMedia, selectMediaByApiId, selectMediaByPk } from "../services/media.service"
import { selectCriticRatings, selectCriticScore, selectPublicRatings, selectPublicScore, selectRatingByPk } from "../services/ratings.service"
import { selectReviewsByMedia } from "../services/reviews.service"
import { insertGenre, selectGenreByApiId } from "../services/genres.service"
import { image, video } from "../api/url.api"
import { insertMediaGenre, selectMediaGenres } from "../services/mediaGenre.service"
import { mediaExists } from "../utils/validation.util"
import { filterMediaByGenre, filterMediaByYear, orderMedia } from "../utils/filter.util"
import { AuthRequest } from "../types/auth.type"

// each page contains 20 entries
export const getAllMovies = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { search, page, genre, order, year } = req.query
        if (!page) page = '1'

        // find movies in external api
        const request = await findMovies(<string> search, <string> page)
        const apiMovies = request.results
        let response = []

        // each page brings 20 entries
        // in current page, iterate over every entry
        for (const apiMovie of apiMovies) {
            // verify if movie exists in database
            let movie = await selectMediaByApiId(apiMovie.id)
            if (!movie) {
                const trailer = await getMovieYTKey(apiMovie.id)

                // if it aint, save it
                movie = await insertMedia({
                    isTv: false,
                    title: apiMovie.original_title,
                    overview: apiMovie.overview,
                    adult: apiMovie.adult,
                    language: apiMovie.original_language,
                    date: apiMovie.release_date || null, 
                    posterUrl: image + apiMovie.poster_path,
                    trailerUrl: video + trailer,
                    apiId: apiMovie.id
                })
                
                const details = await getMovieDetails(apiMovie.id)
                for (const apiGenre of details.genres) {
                    let genre = await selectGenreByApiId(apiGenre.id)
                    if (!genre)
                        genre = await insertGenre({
                            apiId: apiGenre.id,
                            title: apiGenre.name
                        })

                    // add genre to movie
                    await insertMediaGenre({ 
                        mediaId: movie.id, 
                        genreId: genre.id
                    })
                }
            }
            
            response.push({
                ...movie,
                publicRatings: await selectPublicRatings(movie.id) ,
                criticRatings: await selectCriticRatings(movie.id),
                publicScore: await selectPublicScore(movie.id),
                criticScore: await selectCriticScore(movie.id),
                genres: await selectMediaGenres(movie.id)
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

export const getMovieById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        // select movie in db
        const movie = await mediaExists(id)

        // rating by the auth user
        const { user } = (req as AuthRequest)
        const rating = await selectRatingByPk({ 
            userId: user.id, 
            mediaId: movie.id 
        })            
        let score = 0
        if (rating)
            score = parseFloat(rating.score)

        const response = {
            ...movie,
            publicRatings: await selectPublicRatings(movie.id),
            criticRatings: await selectCriticRatings(movie.id),
            publicScore: await selectPublicScore(movie.id),
            criticScore: await selectCriticScore(movie.id),
            genres: await selectMediaGenres(movie.id),
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

export const getMovieReviews = async (req: Request, res: Response, next: NextFunction) => {
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

