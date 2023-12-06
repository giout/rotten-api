import { Request, Response, NextFunction } from "express"
import { findMovies } from "../api/movies.api"
import { insertMedia, selectMediaByApiId } from "../services/media.service"

// each page contains 20 entries
export const getAllMovies = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { search, page } = req.query
        if (!page) page = '1'

        // find movies in external api
        const request = await findMovies(<string> search, <string> page)
        const apiMovies = request.results
        const movies = []

        // each page brings 20 entries
        // in current page, iterate over every entry
        for (const apiMovie of apiMovies) {
            // verify if movie exists in database
            const movie = await selectMediaByApiId(apiMovie.id)
            if (!movie) {
                // if it aint, save it
                await insertMedia({
                    isTv: false,
                    title: apiMovie.original_title,
                    overview: apiMovie.overview,
                    adult: apiMovie.adult,
                    language: apiMovie.original_language,
                    date: apiMovie.release_date, 
                    posterUrl: apiMovie.poster_path,
                    trailerUrl: apiMovie.backdrop_path,
                    apiId: apiMovie.id
                })
            }
            
            // calculate:
            // public ratings
            // critic ratings
            // public score
            // critic score
        }
        // return data
        res.end()
    } catch(e) {
        next(e)
    }
}

export const getMovieById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // select movie in db
        // calculate:
        // public ratings
        // critic ratings
        // public score
        // critic score
        // return data
    } catch(e) {
        next(e)
    }
}

export const getMovieReviews = async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch(e) {
        next(e)
    }
}

