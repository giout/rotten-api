import { Request, Response, NextFunction } from "express"
import { AuthRequest } from "../types/auth.type"
import { dataMissing, userExists, validatePassword, verifyAuth } from "../utils/validation.util"
import { deleteUserByPk, selectAllUsers, updateUser } from "../services/users.service"
import { encrypt } from "../utils/crypt.util"
import { selectRatingsByUser } from "../services/ratings.service"
import { selectReviewsByUser } from "../services/reviews.service"

export const getAuthUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // get payload from token
        const { user } = req as AuthRequest
        const authUser = await userExists(user.id)
        res.status(200).json({
            code: 200,
            data: authUser
        })
    } catch(e) {
        next(e)
    }
}

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await selectAllUsers()
        // get ratings and add them to users
        // get reviews and add them to users
        res.status(200).json({
            code: 200,
            data: users
        })
    } catch(e) {
        next(e)
    }
}

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const user = await userExists(id)
        res.status(200).json({
            code: 200,
            data: {
                ...user,
                ratings: await selectRatingsByUser(id),
                reviews: await selectReviewsByUser(id)
            }
        })
    } catch(e) {
        next(e)
    }
}

export const putUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const { firstName, lastName, password } = req.body
        
        if (!(firstName || lastName || password))
            dataMissing()
        
        verifyAuth(req, id)
        validatePassword(password)
        req.body.password = encrypt(password)

        const user = await updateUser(id, req.body)
        res.status(200).json({
            code: 200,
            data: user
        })
    } catch(e) {
        next(e)
    }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        await userExists(id)
        verifyAuth(req, id)
        await deleteUserByPk(id)
        res.status(200).json({
            code: 200
        })
    } catch(e) {
        next(e)
    }
}