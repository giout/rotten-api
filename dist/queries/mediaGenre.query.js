"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table = 'rotten.media_genre';
const genreTable = 'rotten.genres';
const queries = {
    select: {
        by: {
            media: `SELECT g.genre_title FROM ${table} m INNER JOIN ${genreTable} g ON m.genre_id=g.genre_id WHERE m.media_id=$1`
        }
    },
    insert: `INSERT INTO ${table} (media_id, genre_id) VALUES ($1, $2) RETURNING *`
};
exports.default = queries;
