const table  = 'rotten.genre'

const queries = {
    select: {
        any: `SELECT * FROM ${table}`,
        by: {
            pk: `SELECT * FROM ${table} WHERE genre_id=$1`
        }
    },
    insert: `INSERT INTO ${table} (genre_title) VALUES ($1) RETURNING *`
}

export default queries