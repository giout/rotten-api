import 'dotenv/config'
import { getRequest } from '../utils/axios.util'

const api = 'https://api.themoviedb.org/3'
const key = <string> process.env.API_KEY
const headers = { 'Content-Type': 'application/json' }

export const searchMovies = async (query: string, page: string) => {
    const url = api + '/search/movie'
    const request = await getRequest(url, headers, {
        api_key: key, 
        query,
        page
    })

    return request
}

export const discoverMovies = async (entry: any, page: string) => {
    const params: any = { api_key: key, page }
    if (entry.genre) 
        params.with_genres = entry.genre
    if (entry.year)
        params.year = entry.year
    const url = api + '/discover/movie'
    const request = await getRequest(url, headers, params)
    return request
}

export const findMovieYTKey = async (id: string) => {
    const url = api + `/movie/${id}/videos`
    const request = await getRequest(url, headers, {
        api_key: key
    })

    if (!request.results[0]) return null

    return request.results[0].key
}

export const findMovieDetails = async (id: string) => {
    const url = api + `/movie/${id}`

    const request = await getRequest(url, headers, {
        api_key: key
    })

    return request
}