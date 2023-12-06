import pool from "../config/database"
import queries from "../queries/ratings.query"
import { RatingPost } from "../types/ratings.type"

export const insertRating = async (entry: RatingPost) => {
    const { userId, mediaId, score } = entry
    const sentence = queries.insert
    const rating = await pool.query(sentence, [userId, mediaId, score])
    return rating.rows[0]
}