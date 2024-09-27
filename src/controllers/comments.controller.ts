import { Request, Response, NextFunction } from "express"
import { insertComment, deleteCommentByPk, selectCommentByPk } from "../services/comments.service"
import { commentExists, dataMissing, reviewExists, userExists, verifyAuth } from "../utils/validation.util"
import { AuthRequest } from "../types/auth.type"

export const postComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { reviewId, content } = req.body
        const userId = (req as AuthRequest).user.id
        if (!(userId && reviewId && content))
            dataMissing()

        await userExists(userId)
        await reviewExists(reviewId)
        verifyAuth(req, userId)
        
        const comment = await insertComment({ ...req.body, userId })
        res.status(201).json({
            code: 201,
            data: comment
        })
    } catch(e) {
        next(e)
    }
}

export const getCommentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const comment = await commentExists(id)
        res.status(200).json({
            code: 200,
            data: comment
        })
    } catch(e) {
        next(e)
    }
}

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params

        const comment = await commentExists(id)
        verifyAuth(req, comment.userId)

        await deleteCommentByPk(id)
        res.status(201).json({
            code: 200
        })
    } catch(e) {
        next(e)
    }
}