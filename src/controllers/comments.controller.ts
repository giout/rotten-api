import { Request, Response, NextFunction } from "express"
import { createComment, deleteCommentByPk, selectCommentByPk } from "../services/comments.service"

export const postComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, reviewId, content } = req.body
        const comment = await createComment(req.body)
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
        const comment = await selectCommentByPk(id)
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
        await deleteCommentByPk(id)
        res.status(201).json({
            code: 200
        })
    } catch(e) {
        next(e)
    }
}