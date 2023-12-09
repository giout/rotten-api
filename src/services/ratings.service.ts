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

export const selectPublicRatings = async (mediaId: string) => {
    const sentence = queries.select.count.publicRatings
    const ratings = await pool.query(sentence, [mediaId])
    return parseInt(ratings.rows[0].count) 
}   

export const selectCriticRatings = async (mediaId: string) => {
    const sentence = queries.select.count.criticRatings
    const ratings = await pool.query(sentence, [mediaId])
    return parseInt(ratings.rows[0].count)
}

export const selectPublicScore = async (mediaId: string) => {
    const sentence = queries.select.average.publicScore
    const ratings = await pool.query(sentence, [mediaId])

    if (!ratings.rows[0].avg)
        return 0

    return parseFloat(ratings.rows[0].avg)
}

export const selectCriticScore = async (mediaId: string) => {
    const sentence = queries.select.average.criticScore
    const ratings = await pool.query(sentence, [mediaId])
    
    if (!ratings.rows[0].avg)
        return 0
     
    return parseFloat(ratings.rows[0].avg)
}