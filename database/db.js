import pg from "pg";
import { config } from "dotenv";

config();
const { Pool } = pg;

// Development Configuration String
const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}/${process.env.PG_DATABASE}`; 

// Production Configuration String
const proConfig = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString: 
        (process.env.NODE_ENV === "production" ? proConfig : devConfig),
    ssl: {
        rejectUnauthorized: false
    }
});

export default pool;