import { Request, Response, NextFunction } from "express"
import { createGenre, selectAllGenres, selectGenreById } from "../services/genres.service"

export const getAllGenres = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const genres = await selectAllGenres()
        res.status(200).json(genres)
    } catch(e) {
        next(e)
    }
}

export const postGenre = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title } = req.body
        const genre = await createGenre(title)
        res.status(201).json(genre)
    } catch(e) {
        next(e)
    }
}

export const getGenreById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const genre = await selectGenreById(id)
        res.status(201).json(genre)
    } catch(e) {
        next(e)
    }
}