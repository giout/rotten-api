import { Genre } from "../types/genres.type"

export const filterMediaByGenre = (list: any[], param: string) => {
    // match word without case sensitivity
    return list.filter(
        // param = genre id
        media => media.genres.some(
            (genre: Genre) => genre.id === parseInt(param)
        )
    )
}

export const filterMediaByYear = (list: any[], param: string) => {
    return list.filter(
        media => new Date(media.date).getFullYear().toString() === param
    )
}

export const orderMedia = (list: any[], param: string) => {    
    if (param === 'topscore')
    return list.sort(
        (a, b) => (b.criticScore + b.publicScore) - (a.criticScore + a.publicScore) 
    )

    if (param === 'lowscore')
        return list.sort(
            (a, b) => (a.criticScore + a.publicScore) - (b.criticScore + b.publicScore) 
        )

    if (param === 'new')
        return list.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )

    if (param === 'old')
        return list.sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        )

    return list
}