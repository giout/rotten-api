import { Request } from "express"
import { selectUserByPk } from "../services/users.service"
import { CustomError } from "./error.util"
import { AuthRequest } from "../types/auth.type"
import { selectReviewByPk } from "../services/reviews.service"
import { selectCommentByPk } from "../services/comments.service"
import { selectGenreByPk } from "../services/genres.service"
import { selectMediaByPk } from "../services/media.service"

export const validatePassword = (password: string) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/
    
    if (!regex.test(password)) 
    throw new CustomError('Password must contain at least 8 characters, letters and numbers.', 400)
}

// verify if user that tries to manipulate data is the authenticated user
export const verifyAuth = (req: Request, id: string) => {
    const { user } = (req as AuthRequest)

    if (user.id != id) 
        throw new CustomError('It is not allowed to create, update or delete data of a user that is not authenticated.', 401)
}

export const dataMissing = () => {
    throw new CustomError('Requested data is missing.', 400)
}

export const userExists = async (id: string) => {
    const user = await selectUserByPk(id)
    
    if (!user)
        throw new CustomError('User does not exist.', 404)

    return user
}

export const reviewExists = async (id: string) => {
    const review = await selectReviewByPk(id)

    if (!review) 
        throw new CustomError('Review does not exist.', 404)

    return review
}

export const commentExists = async (id: string) => {
    const comment = await selectCommentByPk(id)

    if (!comment)
        throw new CustomError('Comment does not exist.', 404)

    return comment
}

export const genreExists = async (id: string) => {
    const genre = await selectGenreByPk(id)

    if (!genre)
        throw new CustomError('Genre does not exist.', 404)

    return genre
}

export const mediaExists = async (id: string) => {
    const media = await selectMediaByPk(id)

    if (!media)
        throw new CustomError('Movie or show does not exist.', 404)

    return media
}