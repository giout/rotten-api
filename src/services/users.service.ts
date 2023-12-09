import queries from "../queries/users.query"
import pool from "../config/database"

export const selectUserByPk = async (id: string) => {
    const sentence = queries.select.by.pk
    const users = await pool.query(sentence, [id])

    if (users.rows[0]) 
        return users.rows[0]
    
    return
}

export const selectUserByUsername = async (username: string) => {
    const sentence = queries.select.by.username
    const users = await pool.query(sentence, [username])

    if (users.rows[0]) 
        return users.rows[0]
    
    return
}

export const insertUser = async (user: any) => {
    const sentence = queries.insert

    const args = [user.username, user.firstName, user.lastName, user.password, user.isCritic]

    const users = await pool.query(sentence, args)
    
    return users.rows[0]
}

export const selectAllUsers = async () => {
    const sentence = queries.select.any
    const users = await pool.query(sentence, []) 
    return users.rows
}

export  const updateUser = async (id: string, entry: any) => {
    const { firstName, lastName, password } = queries.update

    if (entry.firstName) 
        await pool.query(firstName, [entry.firstName, id])

    if (entry.lastName) 
        await pool.query(lastName, [entry.lastName, id])

    if (entry.password)
        await pool.query(password, [entry.password, id])

    return selectUserByPk(id)
}

export const deleteUserBD = async (id: string) => {
    const sentence = queries.delete
    await pool.query(sentence, [id])
}