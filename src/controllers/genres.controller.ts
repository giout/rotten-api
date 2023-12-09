import { Request, Response, NextFunction } from "express"
import { selectAllGenres, selectGenreByPk } from "../services/genres.service"
import { genreExists } from "../utils/validation.util"

export const getAllGenres = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const genres = await selectAllGenres()
        res.status(200).json({
            code: 200,
            data: genres
        })
    } catch(e) {
        next(e)
    }
}

export const getGenreById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const genre = await genreExists(id)
        res.status(200).json({
            code: 200,
            data: genre
        })
    } catch(e) {
        next(e)
    }
}