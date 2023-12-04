import { Request, Response, NextFunction } from "express"
import { AuthRequest } from "../types/auth.type"
import jwt, { JwtPayload } from 'jsonwebtoken'
import { CustomError } from "../utils/error.util"

const signature = <string> process.env.TOKEN_SIGNATURE 

export const authentication = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers['authorization'] || ''

    // Esquema de autenticacion Bearer token
    try {
        if (!auth.toLowerCase().startsWith('bearer') && 
            auth.split(' ').length !== 2) {
            throw new CustomError('Invalid bearer token.', 400)
        }
        
        const token = auth.split(' ')[1] // Bearer[0] jf8jf8rf9ff4[1]
        
        // Verificando que el token sea valido
        jwt.verify(token, signature, (err, decoded) => {
            if (err) {
                throw new CustomError('Invalid session.', 401)
            }
            // Se agrega una propiedad al objeto request que contendra los datos del token
            (req as AuthRequest).user = <JwtPayload> decoded 
        })
        
        return next()
    } catch (error) {
        next(error)
    }
}