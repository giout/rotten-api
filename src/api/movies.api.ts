import 'dotenv/config'
import { getRequest } from '../utils/axios.util'

const api = 'https://api.themoviedb.org/3'
const key = <string> process.env.API_KEY
const headers = { 'Content-Type': 'application/json' }

export const findMovies = async (query: string, page: string) => {
    const url = api + '/search/movie'
    const request = await getRequest(url, headers, {
        api_key: key, 
        query,
        page
    })

    return request
}

export const getMovieYTKey = async (id: string) => {
    const url = api + `/movie/${id}/videos`
    const request = await getRequest(url, headers, {
        api_key: key
    })

    if (!request.results[0]) return null

    return request.results[0].key
}

export const getMovieDetails = async (id: string) => {
    const url = api + `/movie/${id}`

    const request = await getRequest(url, headers, {
        api_key: key
    })

    return request
}