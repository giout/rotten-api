const table = `rotten.reviews`

const queries = {
    select: {
        by: {
            mediaId: `SELECT * FROM ${table} WHERE media_id=$1`
        }
    }
}

export default queries