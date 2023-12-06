const table  = 'rotten.ratings'

const queries = {
    'insert': `INSERT INTO ${table} (user_id, media_id, score) VALUES ($1, $2, $3) RETURNING *`
}

export default queries