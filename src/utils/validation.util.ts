import { Request } from "express"
import { selectUserByPk } from "../services/users.service"
import { CustomError } from "./error.util"
import { AuthRequest } from "../types/auth.type"

export const validatePassword = (password: string) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/

    if (!regex.test(password)) 
        throw new CustomError('Password must contain at least 8 characters, letters and numbers.', 400)
}

export const userExists = async (id: string) => {
    const user = await selectUserByPk(id)
    
    if (!user)
        throw new CustomError('User does not exist.', 404)

    return user
}

// verify if user that tries to manipulate data is the authenticated user
export const verifyAuth = (req: Request, id: string) => {
    const { user } = (req as AuthRequest)

    if (user.id != id) 
        throw new CustomError('It is not allowed to create, update or delete data of a user that is not authenticated.', 401)
}