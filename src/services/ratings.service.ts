import pool from "../config/database"
import queries from "../queries/ratings.query"

export const insertRating = async (entry: any) => {
    const { userId, mediaId, score } = entry
    const sentence = queries.insert
    const rating = await pool.query(sentence, [userId, mediaId, score])
    return {
        userId: rating.rows[0].user_id,
        mediaId: rating.rows[0].media_id, 
        score: rating.rows[0].score,
    }
}

export const selectRatingByPk = async (entry: any) => {
    const sentence = queries.select.by.pk
    const rating = await pool.query(sentence, [entry.userId, entry.mediaId])

    if (!rating.rows[0])
        return 

    return {
        userId: rating.rows[0].user_id,
        mediaId: rating.rows[0].media_id, 
        score: rating.rows[0].score,
    }
}

export const deleteRating = async (entry: any) => {
    const sentence = queries.delete
    await pool.query(sentence, [entry.userId, entry.mediaId])
}

export const selectRatingsPublicAvgAndCount = async (mediaId: string) => {
    const sentence = queries.select.avgAndCount.public
    const ratings = await pool.query(sentence, [mediaId])
    return {
        score: parseFloat(ratings.rows[0].avg) || 0,
        ratings: parseInt(ratings.rows[0].count)
    }
}   

export const selectRatingsCriticAvgAndCount = async (mediaId: string) => {
    const sentence = queries.select.avgAndCount.critic
    const ratings = await pool.query(sentence, [mediaId])
    return {
                score: parseFloat(ratings.rows[0].avg) || 0,
        ratings: parseInt(ratings.rows[0].count)
    }
}

export const selectRatingsByUser = async (userId: string) => {
    const sentence = queries.select.count.userRatings
    const ratings = await pool.query(sentence, [userId])
    return parseInt(ratings.rows[0].count)
}