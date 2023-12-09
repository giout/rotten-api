import pool from "../config/database"
import queries from "../queries/reviews.query"
import { Review } from "../types/reviews.type"

export const selectReviewsByMedia = async (movieId: string) => {
    const sentence = queries.select.by.mediaId
    const reviews = await pool.query(sentence, [movieId])
    const response: Review[] = []
    reviews.rows.map(review => {
        response.push({
            id: review.review_id,
            userId: review.user_id,
            content: review.review_content,
            mediaId: review.media_id,
            date: review.review_date
        })
    })
    return response
}

export const createReview = async (entry: any) => {
    const { userId, mediaId, content } = entry
    const sentence = queries.insert
    const review = await pool.query(sentence, [userId, mediaId, content])
    return {
        id: review.rows[0].review_id,
        userId: review.rows[0].user_id,
        content: review.rows[0].review_content,
        mediaId: review.rows[0].media_id,
        date: review.rows[0].review_date
    }
}

export const selectReviewByPk = async (id: string) => {
    const sentence = queries.select.by.pk
    const review = await pool.query(sentence, [id])
    if (!review.rows[0])
        return

    return {
        id: review.rows[0].review_id,
        userId: review.rows[0].user_id,
        content: review.rows[0].review_content,
        mediaId: review.rows[0].media_id,
        date: review.rows[0].review_date
    }
}

export const deleteReviewByPk = async (id: string) => {
    const sentence = queries.delete
    await pool.query(sentence, [id])
}