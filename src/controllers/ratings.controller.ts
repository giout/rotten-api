import { Request, Response, NextFunction } from "express"
import { deleteRating, insertRating, selectRatingByPk } from "../services/ratings.service"
import { verifyAuth } from "../utils/validation.util"

export const postRating = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, mediaId, score } = req.body

        verifyAuth(req, userId)

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