import pool from "../config/database"
import queries from "../queries/mediaGenre.query"
import { Genre } from "../types/genres.type"

export const insertMediaGenre = async (entry: any) => {
    const sentence = queries.insert
    const result = await pool.query(sentence, [entry.mediaId, entry.genreId])
    return result.rows[0]
}

export const selectMediaGenres = async (mediaId: string) => {
    const sentence = queries.select.by.media
    const result = await pool.query(sentence, [mediaId])
    const response: Genre[] = []
    result.rows.map(r => {
        response.push({
            id: r.genre_id,
            title: r.genre_title
        })
    })
    return response
}
