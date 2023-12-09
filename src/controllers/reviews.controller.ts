import { Request, Response, NextFunction } from "express"
import { createReview, deleteReviewByPk, selectReviewByPk } from "../services/reviews.service"
import { selectCommentsByReviewId } from "../services/comments.service"
import { verifyAuth } from "../utils/validation.util"

export const postReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, mediaId, content } = req.body

        verifyAuth(req, userId)

        const review = await createReview(req.body)
        res.status(201).json({
            code: 201, 
            data: review
        })
    } catch(e) {
        next(e)
    }
}

export const getReviewById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const review = await selectReviewByPk(id)
        res.status(200).json({
            code: 200,
            data: review
        })
    } catch(e) {
        next(e)
    }
}

export const deleteReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params

        const review = await selectReviewByPk(id)
        verifyAuth(req, review?.id)
 
        await deleteReviewByPk(id)
        res.status(200).json({
            code: 200
        })
    } catch(e) {
        next(e)
    }
}

export const getReviewComments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const comments = await selectCommentsByReviewId(id)
        res.status(200).json({
            code: 200,
            data: comments
        })
    } catch(e) {
        next(e)
    }
}