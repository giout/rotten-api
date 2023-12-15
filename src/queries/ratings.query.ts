const table  = 'rotten.ratings'
const userTable = 'rotten.users'

const queries = {
    select: {
        by: {
            pk: `SELECT * FROM ${table} WHERE user_id=$1 AND media_id=$2`
        },
        avgAndCount: {
            critic: `SELECT AVG(r.score), COUNT(*) FROM ${table} r INNER JOIN ${userTable} u ON r.user_id=u.user_id WHERE u.is_critic=true AND r.media_id=$1`,
            public: `SELECT AVG(r.score), COUNT(*) FROM ${table} r INNER JOIN ${userTable} u ON r.user_id=u.user_id WHERE u.is_critic=false AND r.media_id=$1`,
        },
        count: {
            userRatings: `SELECT COUNT(*) FROM ${table} WHERE user_id=$1`
        }
    },
    insert: `INSERT INTO ${table} (user_id, media_id, score) VALUES ($1, $2, $3) RETURNING *`,
    delete: `DELETE FROM ${table} WHERE user_id=$1 AND media_id=$2`
}

export default queries