import { Request, Response, NextFunction } from "express"
import { createReview, deleteReviewByPk, selectReviewByPk } from "../services/reviews.service"
import { selectCommentsByReviewId } from "../services/comments.service"
import { dataMissing, reviewExists, verifyAuth } from "../utils/validation.util"
import { AuthRequest } from "../types/auth.type"

export const postReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { mediaId, content } = req.body
        const userId = (req as AuthRequest).user.id
        if (!(userId && mediaId && content))
            dataMissing()
        
        verifyAuth(req, userId)

        const review = await createReview({ ...req.body, userId })
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
        const review = await reviewExists(id)
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

        const review = await reviewExists(id)
        verifyAuth(req, review.userId)
 
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
        await reviewExists(id)

        const comments = await selectCommentsByReviewId(id)
        res.status(200).json({
            code: 200,
            data: comments
        })
    } catch(e) {
        next(e)
    }
}