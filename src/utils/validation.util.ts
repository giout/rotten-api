import { selectUserByPk } from "../services/users.service"
import { UserBD } from "../types/users.type"
import { CustomError } from "./error.util"

export const validatePassword = (password: string) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/

    if (!regex.test(password)) 
        throw new CustomError('Password must contain at least 8 characters, letters and numbers.', 400)
}

export const userExists = async (id: string) => {
    const user: UserBD = await selectUserByPk(id)
    
    if (!user)
        throw new CustomError('User does not exist.', 404)

    return user
}