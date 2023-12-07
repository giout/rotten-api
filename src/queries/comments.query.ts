const table = `rotten.comments`

const queries = {
    select: {
        by: {
            reviewId: `SELECT * FROM ${table} WHERE review_id=$1`,
            pk: `SELECT * FROM ${table} WHERE comment_id=$1`
        }
    },
    insert: `INSERT INTO ${table} (user_id, review_id, comment_content) VALUES ($1,$2,$3) RETURNING *`,
    delete: `DELETE FROM ${table} WHERE comment_id=$1`
}

export default queries