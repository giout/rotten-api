"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table = 'rotten.media';
const queries = {
    select: {
        by: {
            apiId: `SELECT * FROM ${table} WHERE media_api_id=$1`,
            pk: `SELECT * FROM ${table} WHERE media_id=$1`
        }
    },
    insert: `INSERT INTO ${table} (is_tv, media_title, overview, adult, original_language, release_date, poster_url, trailer_url, media_api_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`
};
exports.default = queries;
