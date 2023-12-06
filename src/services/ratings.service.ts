import pool from "../config/database"
import queries from "../queries/ratings.query"
import { RatingPk, RatingPost } from "../types/ratings.type"

export const insertRating = async (entry: RatingPost) => {
    const { userId, mediaId, score } = entry
    const sentence = queries.insert
    const rating = await pool.query(sentence, [userId, mediaId, score])
    return rating.rows[0]
}

export const selectRatingByPk = async (entry: RatingPk) => {
    const sentence = queries.select.by.pk
    const rating = await pool.query(sentence, [entry.userId, entry.mediaId])

    if (rating.rows[0])
        return rating.rows[0]

    return
}

export const deleteRating = async (entry: RatingPk) => {
    const sentence = queries.delete
    await pool.query(sentence, [entry.userId, entry.mediaId])
}



export const selectPublicRatings = async (mediaId: string) => {
    const sentence = queries.select.count.criticRatings
    const ratings = await pool.query(sentence, [mediaId])
    return parseInt(ratings.rows[0].count) 
}   

export const selectCriticRatings = async (mediaId: string) => {
    const sentence = queries.select.count.publicRatings
    const ratings = await pool.query(sentence, [mediaId])
    return parseInt(ratings.rows[0].count)
}

export const selectPublicScore = async (mediaId: string) => {
    const sentence = queries.select.average.criticScore
    const ratings = await pool.query(sentence, [mediaId])

    if (!ratings.rows[0].avg)
        return 0

    return parseFloat(ratings.rows[0].avg)
}

export const selectCriticScore = async (mediaId: string) => {
    const sentence = queries.select.average.publicScore
    const ratings = await pool.query(sentence, [mediaId])
    
    if (!ratings.rows[0].avg)
        return 0
     
    return parseFloat(ratings.rows[0].avg)
}