import { Request, Response, NextFunction } from "express"
import { insertRating } from "../services/ratings.service"

export const postRating = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, mediaId, score } = req.body
        const rating = await insertRating({ userId, mediaId, score })
        res.status(201).json({
            code: 201,
            data: rating
        })
    } catch(e) {
        next(e)
    }
}