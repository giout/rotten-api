import queries from "../queries/users.query"
import pool from "../config/database"
import { UserReq } from "../types/users.type"

export const findUserByPk = async (id: number) => {
    const sentence = queries.select.by.pk
    const users = await pool.query(sentence, [id])

    if (users.rows[0]) 
        return users.rows[0]
    
    return
}

export const findUserByUsername = async (username: string) => {
    const sentence = queries.select.by.username
    const users = await pool.query(sentence, [username])

    if (users.rows[0]) 
        return users.rows[0]
    
    return
}

export const createUser = async (user: UserReq) => {
    const sentence = queries.insert

    const args = [user.username, user.firstName, user.lastName, user.password, user.isCritic]

    const users = await pool.query(sentence, args)
    
    return users.rows[0]
}