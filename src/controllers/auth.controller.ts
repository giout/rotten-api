import { NextFunction, Request, Response } from "express"
import { CustomError } from "../utils/error.util"
import { dataMissing, validatePassword } from "../utils/validation.util"
import { compareCrypted, encrypt } from "../utils/crypt.util"
import { insertUser, selectUserByUsername } from "../services/users.service"
import jwt from "jsonwebtoken"

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, firstName, lastName, password, isCritic } = req.body

        if (!(username && firstName && lastName && password && isCritic != undefined && isCritic != null))
            dataMissing()

        const user = await selectUserByUsername(username)

        if (user)
            throw new CustomError('User already exists.', 400)

        validatePassword(password)

        req.body.password = encrypt(password)

        const createdUser = await insertUser(req.body)

        res.status(201).json({
            code: 201,
            data: createdUser
        })
    } catch(e) {
        next(e)
    }
}

export const logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body
        
        if (!(username && password))
            dataMissing()
        
        // verify if user exists
        const user = await selectUserByUsername(username)

        if (!user)
            throw new CustomError('User does not exist.', 404)
        
        // verify if password matches
        const equals = compareCrypted(password, user.password)

        if (!equals) 
            throw new CustomError('Password is invalid.', 401)

        // create and send authentication token    
        const signature = <string> process.env.TOKEN_SIGNATURE

        const payload = { id: user.id} // data payload

        const token = jwt.sign(payload, signature, { 
            expiresIn: 60*60*24*30 // 1 month
        })

        res.status(200).json({ 
            code: 200, 
            data: {
                token
            }
        })
    } catch(e) {
        next(e)
    }
}
