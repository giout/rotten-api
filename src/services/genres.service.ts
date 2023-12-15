import queries from "../queries/genres.query"
import pool from "../config/database"
import { Genre } from "../types/genres.type"

export const selectAllGenres = async () => {
    const sentence = queries.select.any
    const genres = await pool.query(sentence, [])
    const response: Genre[] = []
    genres.rows.map(genre => {
        response.push({
            id: genre.genre_id,
            title: genre.genre_title
        }) 
    })
    return response
}

export const insertGenre = async (entry: any) => {
    const sentence = queries.insert
    const genre = await pool.query(sentence, [entry.title, entry.id])
    return {
        id: genre.rows[0].genre_id,
        title: genre.rows[0].genre_title
    }
}

export const selectGenreByPk = async (id: string) => {
    const sentence = queries.select.by.pk
    const genre = await pool.query(sentence, [id])
    if (!genre.rows[0])
        return 

    return {
        id: genre.rows[0].genre_id,
        title: genre.rows[0].genre_title
    }
}

export const selectGenreByApiId = async (apiId: string) => {
    const sentence = queries.select.by.apiId
    const genre = await pool.query(sentence, [apiId])

    if (!genre.rows[0])
        return 

    return {
        id: genre.rows[0].genre_id,
        title: genre.rows[0].genre_title
    }
}

export const selectGenreApiIdByPk = async (id: string) => {
    const sentence = queries.select.by.pk
    const genre = await pool.query(sentence, [id])
    if (!genre.rows[0])
        return 

    return genre.rows[0].genre_api_id
}