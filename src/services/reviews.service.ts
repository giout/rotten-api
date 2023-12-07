import pool from "../config/database"
import queries from "../queries/reviews.query"
import { ReviewPost } from "../types/reviews.type"

export const selectReviewsByMedia = async (movieId: string) => {
    const sentence = queries.select.by.mediaId
    const reviews = await pool.query(sentence, [movieId])
    return reviews.rows
}

export const createReview = async (entry: ReviewPost) => {
    const { userId, mediaId, content } = entry
    const sentence = queries.insert
    const review = await pool.query(sentence, [userId, mediaId, content])
    return review.rows[0]
}

export const selectReviewByPk = async (id: string) => {
    const sentence = queries.select.by.pk
    const review = await pool.query(sentence, [id])
    return review.rows[0]
}

export const deleteReviewByPk = async (id: string) => {
    const sentence = queries.delete
    await pool.query(sentence, [id])
}