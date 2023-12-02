import 'dotenv/config'
import { Pool } from 'pg'

const uri = <string> process.env.DB_URI

const pool = new Pool({connectionString: uri})

export default pool