import pool from "../config/database"
import queries from "../queries/comments.query"

export const selectCommentsByReviewId = async (reviewId: string) => {
    const sentence = queries.select.by.reviewId
    const comments = await pool.query(sentence, [reviewId])
    return comments.rows
}

export const createComment = async (entry: any) => {
    const { userId, reviewId, content } = entry
    const sentence = queries.insert
    const review = await pool.query(sentence, [userId, reviewId, content])
    return review.rows[0]
}

export const selectCommentByPk = async (id: string) => {
    const sentence = queries.select.by.pk
    const review = await pool.query(sentence, [id])
    return review.rows[0]
}

export const deleteCommentByPk = async (id: string) => {
    const sentence = queries.delete
    await pool.query(sentence, [id])
}