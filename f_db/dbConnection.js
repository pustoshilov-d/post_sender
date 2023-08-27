import { DATABASE_URL } from '../config.js'
import pkg from 'pg'
const { Pool } = pkg

export const makeDBRequest = async (sql_string) => {
  try {
    const pool = new Pool({
      connectionString: DATABASE_URL,
      ssl: { sslmode: 'require', rejectUnauthorized: false },
    })
    let res = await pool.query(sql_string)
    return res
  } catch (e) {
    console.log(`error createPool ${e}`)
  }
}
