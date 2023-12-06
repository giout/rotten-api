import axios from "axios"

export const getRequest = async (url: string, headers: any = {}, params: any = {}) => {
    const request = await axios(url, {
        headers, 
        params
    })

    return request.data
}