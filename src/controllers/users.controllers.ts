import { Request, Response, NextFunction } from "express"
import { AuthRequest } from "../types/auth.type"
import { UserBD } from "../types/users.type"
import { userExists } from "../utils/validation.util"

export const getAuthUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // get payload from token
        const { user } = req as AuthRequest

        console.log(req)

        const authUser: UserBD = await userExists(user.id)

        res.status(200).json(authUser)
    } catch(e) {
        next(e)
    }
}