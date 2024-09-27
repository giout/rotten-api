import { Request, Response, NextFunction } from "express"
import { deleteRating, insertRating, selectRatingByPk } from "../services/ratings.service"
import { dataMissing, verifyAuth } from "../utils/validation.util"
import { AuthRequest } from "../types/auth.type"

export const postRating = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { mediaId, score } = req.body
        const userId = (req as AuthRequest).user.id
        if (!(userId && mediaId && score))
            dataMissing()

        verifyAuth(req, userId)

        // verify if rating already exists
        const rating = await selectRatingByPk({ ...req.body, userId })
        // if rating exists, it is deleted
        if (rating) 
            await deleteRating({ ...req.body, userId })

        const createdRating = await insertRating({ ...req.body, userId })
        res.status(201).json({
            code: 201,
            data: createdRating
        })
    } catch(e) {
        next(e)
    }
}