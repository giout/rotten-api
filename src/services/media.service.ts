import pool from "../config/database"
import queries from "../queries/media.query"

export const selectMediaByApiId = async (id: string) => {
    const sentence = queries.select.by.apiId
    const media = await pool.query(sentence, [id])

    if (!media.rows[0])
        return

    return {
        id: media.rows[0].media_id,
        title: media.rows[0].media_title,
        overview: media.rows[0].overview,
        adult: media.rows[0].adult,
        language: media.rows[0].original_language,
        date: media.rows[0].release_date,
        posterUrl: media.rows[0].poster_url,
        trailerUrl: media.rows[0].trailer_url
    }
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

    return {
        id: media.rows[0].media_id,
        title: media.rows[0].media_title,
        overview: media.rows[0].overview,
        adult: media.rows[0].adult,
        language: media.rows[0].original_language,
        date: media.rows[0].release_date,
        posterUrl: media.rows[0].poster_url,
        trailerUrl: media.rows[0].trailer_url
    }
}

export const selectMediaByPk = async (id: string) => {
    const sentence = queries.select.by.pk
    const media = await pool.query(sentence, [id])
    if (!media.rows[0])
        return

    return {
        id: media.rows[0].media_id,
        title: media.rows[0].media_title,
        overview: media.rows[0].overview,
        adult: media.rows[0].adult,
        language: media.rows[0].original_language,
        date: media.rows[0].release_date,
        posterUrl: media.rows[0].poster_url,
        trailerUrl: media.rows[0].trailer_url
    }
}