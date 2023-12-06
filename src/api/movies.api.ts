import 'dotenv/config'
import { getRequest } from '../utils/axios.util'

const api = 'https://api.themoviedb.org/3'
const key = <string> process.env.API_KEY
const headers = { 'Content-Type': 'application/json' }


// each page contains 20 entries
export const findMovies = async (query: string, page: string) => {
    const url = api + '/search/movie'
    const request = await getRequest(url, headers, {
        api_key: key, 
        query,
        page
    })

    return request
}