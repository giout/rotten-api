import { Request, Response, NextFunction } from "express"
import { findMovies, getMovieDetails, getMovieYTKey } from "../api/movies.api"
import { insertMedia, selectMediaByApiId, selectMediaByPk } from "../services/media.service"
import { selectCriticRatings, selectCriticScore, selectPublicRatings, selectPublicScore } from "../services/ratings.service"
import { selectReviewsByMedia } from "../services/reviews.service"
import { insertGenre, selectGenreByApiId } from "../services/genres.service"
import { image, video } from "../api/url.api"

// each page contains 20 entries
export const getAllMovies = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { search, page } = req.query
        if (!page) page = '1'

        // find movies in external api
        const request = await findMovies(<string> search, <string> page)
        const apiMovies = request.results
        const response = []

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
                    if (genre)
                        continue
                    // add genre if it doesnt exist
                    await insertGenre({
                        apiId: apiGenre.id,
                        title: apiGenre.name
                    })
                }

                // add genre to movie
            }

            // calculate:
            const publicRatings = await selectPublicRatings(movie.media_id) 
            const criticRatings = await selectCriticRatings(movie.media_id)
            const publicScore = await selectPublicScore(movie.media_id)
            const criticScore = await selectCriticScore(movie.media_id)

            // add to response movie genre
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

export const getMovieById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        // select movie in db
        const movie = await selectMediaByPk(id)

        const publicRatings = await selectPublicRatings(movie.media_id) 
        const criticRatings = await selectCriticRatings(movie.media_id)
        const publicScore = await selectPublicScore(movie.media_id)
        const criticScore = await selectCriticScore(movie.media_id)
        
        const response = {
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

export const getMovieReviews = async (req: Request, res: Response, next: NextFunction) => {
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

