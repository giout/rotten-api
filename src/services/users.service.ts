import queries from "../queries/users.query"
import pool from "../config/database"
import { User } from "../types/users.type"

export const selectUserByPk = async (id: string) => {
    const sentence = queries.select.by.pk
    const users = await pool.query(sentence, [id])
    if (!users.rows[0]) 
        return
    
    return {
        id: users.rows[0].user_id,
        username: users.rows[0].username, 
        firstName:users.rows[0].first_name,
        lastName: users.rows[0].last_name,
        password: users.rows[0].pass,
        isCritic: users.rows[0].is_critic
    }
}

export const selectUserByUsername = async (username: string) => {
    const sentence = queries.select.by.username
    const users = await pool.query(sentence, [username])
    if (!users.rows[0]) 
        return
    
    return {
        id: users.rows[0].user_id,
        username: users.rows[0].username, 
        firstName:users.rows[0].first_name,
        lastName: users.rows[0].last_name,
        password: users.rows[0].pass,
        isCritic: users.rows[0].is_critic
    }
}

export const insertUser = async (entry: any) => {
    const sentence = queries.insert

    const args = [entry.username, entry.firstName, entry.lastName, entry.password, entry.isCritic]

    const users = await pool.query(sentence, args)

    return {
        id: users.rows[0].user_id,
        username: users.rows[0].username, 
        firstName:users.rows[0].first_name,
        lastName: users.rows[0].last_name,
        password: users.rows[0].pass,
        isCritic: users.rows[0].is_critic
    }
}

export const selectAllUsers = async () => {
    const sentence = queries.select.any
    const users = await pool.query(sentence, []) 
    const response: User[] = []
    users.rows.map(user => {
        response.push({
            id: user.user_id,
            username: user.username, 
            firstName:user.first_name,
            lastName: user.last_name,
            password: user.pass,
            isCritic: user.is_critic
        })
    })
    return response
}

export  const updateUser = async (id: string, entry: any) => {
    const { firstName, lastName, password } = queries.update

    if (entry.firstName) 
        await pool.query(firstName, [entry.firstName, id])

    if (entry.lastName) 
        await pool.query(lastName, [entry.lastName, id])

    if (entry.password)
        await pool.query(password, [entry.password, id])

    return await selectUserByPk(id)
}

export const deleteUserByPk = async (id: string) => {
    const sentence = queries.delete
    await pool.query(sentence, [id])
}