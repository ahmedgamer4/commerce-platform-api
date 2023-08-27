import * as dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, NODE_ENV, POSTGRES_DB_TEST } =
  process.env

const client = new Pool({
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  host: POSTGRES_HOST,
  database: NODE_ENV === 'test' ? POSTGRES_DB_TEST : POSTGRES_DB,
  max: 10,
})

export default client
