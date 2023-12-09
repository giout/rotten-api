"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const pg_1 = require("pg");
const uri = process.env.DB_URI;
const pool = new pg_1.Pool({ connectionString: uri });
exports.default = pool;
