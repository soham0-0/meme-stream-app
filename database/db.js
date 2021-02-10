import pg from "pg";
import { config } from "dotenv";

config();
const { Pool } = pg;

const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}/${process.env.PG_DATABASE}`; 

const pool = new Pool({
    connectionString: 
        devConfig,
});

export default pool;