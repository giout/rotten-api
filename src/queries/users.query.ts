const table = 'rotten.users'

const queries = {
    select: {
        by: {
            username: `SELECT * FROM ${table} WHERE username=$1`,
            pk: `SELECT * FROM ${table} WHERE user_id=$1`
        },
    },
    insert: `INSERT INTO ${table} (username, first_name, last_name, pass, is_critic) VALUES ($1,$2,$3,$4,$5) RETURNING *`
}

export default queries