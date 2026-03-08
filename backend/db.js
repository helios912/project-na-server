// backend/db.js
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST, // тут 'db' з docker-compose
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
});

export default pool;
