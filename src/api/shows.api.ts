import 'dotenv/config'
import { getRequest } from '../utils/axios.util'

const api = 'https://api.themoviedb.org/3'
const key = <string> process.env.API_KEY
const headers = { 'Content-Type': 'application/json' }


export const searchShows = async (query: string, page: string) => {
    const url = api + '/search/tv'
    const request = await getRequest(url, headers, {
        api_key: key, 
        query,
        page
    })

    return request
}

export const discoverShows = async (entry: any, page: string) => {
    const params: any = { api_key: key, page }
    if (entry.genre) 
        params.with_genres = entry.genre
    if (entry.year)
        params.first_air_date_year = entry.year
    const url = api + '/discover/tv'
    const request = await getRequest(url, headers, params)
    return request
}

export const findShowYTKey = async (id: string) => {
    const url = api + `/tv/${id}/videos`
    const request = await getRequest(url, headers, {
        api_key: key
    })

    if (!request.results[0]) return null

    return request.results[0].key
}

export const findShowDetails = async (id: string) => {
    const url = api + `/tv/${id}`

    const request = await getRequest(url, headers, {
        api_key: key
    })

    return request
}