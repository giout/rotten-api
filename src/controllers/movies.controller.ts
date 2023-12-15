import { Request, Response, NextFunction } from "express"
import { searchMovies, findMovieDetails, findMovieYTKey, discoverMovies } from "../api/movies.api"
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
export const getAllMovies = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let request
        let { search, page, genre, order, year } = req.query
        if (!page) page = '1'

        // find movies in external api
        if (search)
            request = await searchMovies(<string> search, <string> page)
        else
            request = await discoverMovies({genre, year}, <string> page)

        const apiMovies = request.results
        let response = []

        // each page brings 20 entries
        // in current page, iterate over every entry
        for (const apiMovie of apiMovies) {
            response.push({
                isTv: false,
                title: apiMovie.original_title,
                overview: apiMovie.overview,
                adult: apiMovie.adult,
                language: apiMovie.original_language,
                date: apiMovie.release_date || null, 
                posterUrl: apiMovie.poster_path ? image + apiMovie.poster_path : null,
                id: apiMovie.id
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

export const getMovieById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        // verify if movie exists in db
        let movie: any = await selectMediaByPk(id)
        if (!movie) {
            // search movie in external api
            const apiMovie = await findMovieDetails(<string>id)
            const trailer = await findMovieYTKey(apiMovie.id)
            // store data
            movie = await insertMedia({
                isTv: false,
                title: apiMovie.original_title,
                overview: apiMovie.overview,
                adult: apiMovie.adult,
                language: apiMovie.original_language,
                date: apiMovie.release_date || null, 
                posterUrl: apiMovie.poster_path ? image + apiMovie.poster_path : null,
                trailerUrl: trailer ? trailer : null,
                id: apiMovie.id
            })

            for (const movieGenre of apiMovie.genres) {
                let genre = await selectGenreByPk(movieGenre.id)
                if (!genre)
                    genre = await insertGenre({
                        id: movieGenre.id,
                        title: movieGenre.name
                    })

                // add genre to movie
                await insertMediaGenre({ 
                    mediaId: apiMovie.id, 
                    genreId: genre.id
                })
            }
        }

        // rate by the auth user
        const { user } = (req as AuthRequest)
        const rating = await selectRatingByPk({ 
            userId: user.id, 
            mediaId: movie?.id 
        })            
        let score = 0
        if (rating)
            score = parseFloat(rating.score)

        const criticStats = await selectRatingsCriticAvgAndCount(movie.id)
        const publicStats = await selectRatingsPublicAvgAndCount(movie.id)

        const response = {
            ...movie,
            publicRatings: publicStats.ratings,
            criticRatings: criticStats.ratings,
            publicScore: publicStats.score,
            criticScore: criticStats.score,
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

