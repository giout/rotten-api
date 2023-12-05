import { NextFunction, Request, Response } from "express"
import { CustomError } from "../utils/error.util"
import { validatePassword } from "../utils/validation.util"
import { compareCrypted, encrypt } from "../utils/crypt.util"
import { insertUser, selectUserByUsername } from "../services/users.service"
import jwt from "jsonwebtoken"
import { UserBD } from "../types/users.type"

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { username, firstName, lastName, password, isCritic } = req.body

        const user: UserBD = await selectUserByUsername(username)

        if (user)
            throw new CustomError('User already exists.', 400)

        // validate empty fields
        if (!(username && firstName && lastName && password && isCritic != undefined && isCritic != null))
            throw new CustomError('Data is missing.', 400)

        validatePassword(password)

        password = encrypt(password)

        const createdUser = await insertUser({ username, firstName, lastName, password, isCritic })

        res.status(201).json(createdUser)
    } catch(e) {
        next(e)
    }
}

export const logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body
        
        // verify if user exists
        const user: UserBD = await selectUserByUsername(username)

        if (!user)
            throw new CustomError('User does not exist.', 404)
        
        // verify if password matches
        const equals = compareCrypted(password, user.pass)

        if (!equals) 
            throw new CustomError('Password is invalid.', 401)

        // create and send authentication token    
        const signature = <string> process.env.TOKEN_SIGNATURE

        const payload = { id: user.user_id} // data payload

        const token = jwt.sign(payload, signature, { 
            expiresIn: 60*60*24*30 // 1 month
        })

        res.status(200).json({ token })
    } catch(e) {
        next(e)
    }
}
