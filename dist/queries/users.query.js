"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table = `rotten.users`;
const queries = {
    select: {
        by: {
            username: `SELECT * FROM ${table} WHERE username=$1`,
            pk: `SELECT * FROM ${table} WHERE user_id=$1`
        },
        any: `SELECT * FROM ${table}`
    },
    insert: `INSERT INTO ${table} (username, first_name, last_name, pass, is_critic) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    update: {
        firstName: `UPDATE ${table} SET first_name=$1 WHERE user_id=$2`,
        lastName: `UPDATE ${table} SET last_name=$1 WHERE user_id=$2`,
        password: `UPDATE ${table} SET pass=$1 WHERE user_id=$2`
    },
    delete: `DELETE FROM ${table} WHERE user_id=$1`
};
exports.default = queries;
