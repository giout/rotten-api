import 'dotenv/config'
import { getRequest } from '../utils/axios.util'

const api = 'https://api.themoviedb.org/3'
const key = <string> process.env.API_KEY
const headers = { 'Content-Type': 'application/json' }


// each page contains 20 entries
export const findMovieGenres = async () => {
    const url = api + '/genre/movie/list'
    const request = await getRequest(url, headers, {
        api_key: key
    })

    // convert array into map
    const map = new Map()
    request.genres.map((genre: any) => {
        map.set(genre.id, genre.name)
    })  

    return map
}

export const findShowGenres = async () => {
    const url = api + '/genre/tv/list'
    const request = await getRequest(url, headers, {
        api_key: key
    })

    // convert array into map
    const map = new Map()
    request.genres.map((genre: any) => {
        map.set(genre.id, genre.name)
    }) 

    return map
}