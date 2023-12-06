import pool from "../config/database"
import queries from "../queries/media.query"
import { MediaPost } from "../types/media.type"

export const selectMediaByApiId = async (id: string) => {
    const sentence = queries.select.by.apiId
    const movies = await pool.query(sentence, [id])

    if (movies.rows[0])
        return movies.rows[0]

    return
}

export const insertMedia = async (entry: MediaPost) => {
    const sentence = queries.insert

    const movie = await pool.query(sentence, [
        entry.isTv,
        entry.title,
        entry.overview,
        entry.adult,
        entry.language,
        entry.date,
        entry.posterUrl,
        entry.trailerUrl,
        entry.apiId
    ])

    return movie
}