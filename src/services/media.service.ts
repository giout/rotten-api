import pool from "../config/database"
import queries from "../queries/media.query"

export const selectMediaByApiId = async (id: string) => {
    const sentence = queries.select.by.apiId
    const media = await pool.query(sentence, [id])

    if (media.rows[0])
        return media.rows[0]

    return
}

export const insertMedia = async (entry: any) => {
    const sentence = queries.insert

    const media = await pool.query(sentence, [
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

    return media.rows[0]
}

export const selectMediaByPk = async (id: string) => {
    const sentence = queries.select.by.pk
    const media = await pool.query(sentence, [id])

    if (media.rows[0])
        return media.rows[0]

    return
}