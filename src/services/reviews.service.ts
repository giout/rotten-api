import pool from "../config/database"
import queries from "../queries/reviews.query"

export const selectReviewsByMedia = async (movieId: string) => {
    const sentence = queries.select.by.mediaId
    const reviews = await pool.query(sentence, [movieId])
    return reviews.rows
}