"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table = 'rotten.genres';
const queries = {
    select: {
        any: `SELECT * FROM ${table}`,
        by: {
            pk: `SELECT * FROM ${table} WHERE genre_id=$1`,
            apiId: `SELECT * FROM ${table} WHERE genre_api_id=$1`
        }
    },
    insert: `INSERT INTO ${table} (genre_title, genre_api_id) VALUES ($1, $2) RETURNING *`
};
exports.default = queries;
