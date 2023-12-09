import pool from "../config/database"
import queries from "../queries/mediaGenre.query"

export const insertMediaGenre = async (entry: any) => {
    const sentence = queries.insert
    const result = await pool.query(sentence, [entry.mediaId, entry.genreId])
    return result.rows[0]
}

export const selectMediaGenres = async (mediaId: string) => {
    const sentence = queries.select.by.media
    const result = await pool.query(sentence, [mediaId])
    return result.rows.map(r => r.genre_title)
}
