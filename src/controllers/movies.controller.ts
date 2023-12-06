import { Request, Response, NextFunction } from "express"
import { findMovies } from "../api/movies.api"

// each page contains 20 entries
export const getAllMovies = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { search, page } = req.query
        // find movies in external api
        const request = await findMovies(<string> search, <string> page)
        const apiMovies = request.results
        const movies = []
        // each page brings 20 entries
        // in current page, iterate over every entry
        for (const movie of apiMovies) {
            // verify if movie exists in database
            
            // if it aint, save it
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

