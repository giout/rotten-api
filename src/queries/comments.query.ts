const table = `rotten.comments`

const queries = {
    select: {
        by: {
            reviewId: `SELECT * FROM ${table} WHERE review_id=$1`
        }
    }
}

export default queries