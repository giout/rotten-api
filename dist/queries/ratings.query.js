"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table = 'rotten.ratings';
const userTable = 'rotten.users';
const queries = {
    select: {
        by: {
            pk: `SELECT * FROM ${table} WHERE user_id=$1 AND media_id=$2`
        },
        count: {
            criticRatings: `SELECT COUNT(*) FROM ${table} r INNER JOIN ${userTable} u ON r.user_id=u.user_id WHERE u.is_critic=true AND r.media_id=$1`,
            publicRatings: `SELECT COUNT(*) FROM ${table} r INNER JOIN ${userTable} u ON r.user_id=u.user_id WHERE u.is_critic=false AND r.media_id=$1`,
            userRatings: `SELECT COUNT(*) FROM ${table} WHERE user_id=$1`
        },
        average: {
            criticScore: `SELECT AVG(r.score) FROM rotten.ratings r INNER JOIN rotten.users u ON r.user_id=u.user_id WHERE u.is_critic=true AND r.media_id=$1`,
            publicScore: `SELECT AVG(r.score) FROM rotten.ratings r INNER JOIN rotten.users u ON r.user_id=u.user_id WHERE u.is_critic=false AND r.media_id=$1`
        }
    },
    insert: `INSERT INTO ${table} (user_id, media_id, score) VALUES ($1, $2, $3) RETURNING *`,
    delete: `DELETE FROM ${table} WHERE user_id=$1 AND media_id=$2`
};
exports.default = queries;
