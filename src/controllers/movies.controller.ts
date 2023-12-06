import { Request, Response, NextFunction } from "express"

export const getAllMovies = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // find movies in external api
        // each page brings 20 entries
        // in every page, iterate over every entry
        // verify if movie exists in database
        // if it aint, save it
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

