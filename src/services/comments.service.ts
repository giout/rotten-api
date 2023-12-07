import pool from "../config/database"
import queries from "../queries/comments.query"

export const selectCommentsByReviewId = async (reviewId: string) => {
    const sentence = queries.select.by.reviewId
    const comments = await pool.query(sentence, [reviewId])
    return comments.rows
}