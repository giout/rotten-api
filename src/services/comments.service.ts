import pool from "../config/database"
import queries from "../queries/comments.query"
import { Comment } from "../types/comments.type"

export const selectCommentsByReviewId = async (reviewId: string): Promise<Comment[]> => {
    const sentence = queries.select.by.reviewId
    const comments = await pool.query(sentence, [reviewId])
    const response: Comment[] = []
    comments.rows.map(comment => {
        response.push({
            id: comment.comment_id,
            userId: comment.user_id,
            content: comment.comment_content,
            reviewId: comment.review_id,
            date: comment.comment_date
        })
    })
    return response
}

export const createComment = async (entry: any) => {
    const { userId, reviewId, content } = entry
    const sentence = queries.insert
    const comment = await pool.query(sentence, [userId, reviewId, content])

    return {
        id: comment.rows[0].comment_id,
        userId: comment.rows[0].user_id,
        content: comment.rows[0].comment_content,
        reviewId: comment.rows[0].review_id,
        date: comment.rows[0].comment_date
    }
}

export const selectCommentByPk = async (id: string) => {
    const sentence = queries.select.by.pk
    const comment = await pool.query(sentence, [id])
    
    if (!comment.rows[0])
        return 

    return {
        id: comment.rows[0].comment_id,
        userId: comment.rows[0].user_id,
        content: comment.rows[0].comment_content,
        reviewId: comment.rows[0].review_id,
        date: comment.rows[0].comment_date
    }
}

export const deleteCommentByPk = async (id: string) => {
    const sentence = queries.delete
    await pool.query(sentence, [id])
}