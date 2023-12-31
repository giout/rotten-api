"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table = `rotten.reviews`;
const queries = {
    select: {
        by: {
            mediaId: `SELECT * FROM ${table} WHERE media_id=$1`,
            pk: `SELECT * FROM ${table} WHERE review_id=$1`
        },
        count: {
            userReviews: `SELECT COUNT(*) FROM rotten.reviews WHERE user_id=$1`
        }
    },
    insert: `INSERT INTO ${table} (user_id, media_id, review_content) VALUES ($1,$2,$3) RETURNING *`,
    delete: `DELETE FROM ${table} WHERE review_id=$1`
};
exports.default = queries;
