import { Request, Response, NextFunction } from "express"
import { deleteRating, insertRating, selectRatingByPk } from "../services/ratings.service"

export const postRating = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, mediaId, score } = req.body
        // verify if rating already exists
        const rating = await selectRatingByPk({ userId, mediaId })
        // if rating exists, it is deleted
        if (rating) 
            await deleteRating({ userId, mediaId })

        const createdRating = await insertRating({ userId, mediaId, score })
        res.status(201).json({
            code: 201,
            data: createdRating
        })
    } catch(e) {
        next(e)
    }
}