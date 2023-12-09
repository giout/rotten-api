import { Request, Response, NextFunction } from "express"
import { deleteRating, insertRating, selectRatingByPk } from "../services/ratings.service"

export const postRating = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, mediaId, score } = req.body
        // verify if rating already exists
        const rating = await selectRatingByPk(req.body)
        // if rating exists, it is deleted
        if (rating) 
            await deleteRating(req.body)

        const createdRating = await insertRating(req.body)
        res.status(201).json({
            code: 201,
            data: createdRating
        })
    } catch(e) {
        next(e)
    }
}