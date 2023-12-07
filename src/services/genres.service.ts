import queries from "../queries/genres.query"
import pool from "../config/database"
import { GenrePost } from "../types/genres.type"

export const selectAllGenres = async () => {
    const sentence = queries.select.any
    const genres = await pool.query(sentence, [])
    return genres.rows
}

export const createGenre = async (entry: GenrePost) => {
    const sentence = queries.insert
    const genre = await pool.query(sentence, [entry.title, entry.apiId])
    return genre.rows[0]
}

export const selectGenreById = async (id: string) => {
    const sentence = queries.select.by.pk
    const genre = await pool.query(sentence, [id])

    if (genre.rows[0])
        return genre.rows[0]
    return
}

export const selectGenreByApiId = async (apiId: string) => {
    const sentence = queries.select.by.apiId
    const genre = await pool.query(sentence, [apiId])

    if (genre.rows[0])
        return genre.rows[0]
 
    return
}