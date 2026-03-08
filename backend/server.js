import express from 'express';
import cors from 'cors';
import pool from './db.js';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

async function waitForDB() {
    while (true) {
        try {
            await pool.query('SELECT 1');
            console.log('✅ Connected to PostgreSQL');
            break;
        } catch (err) {
            console.log('⏳ Waiting for PostgreSQL...');
            await new Promise((res) => setTimeout(res, 3000));
        }
    }
}

async function startServer() {
    await waitForDB();

    await pool.query(`
    CREATE TABLE IF NOT EXISTS todos (
      id UUID PRIMARY KEY,
      title TEXT NOT NULL,
      completed BOOLEAN DEFAULT FALSE
    );
  `);

    // GET todos
    app.get('/todos', async (req, res) => {
        const { rows } = await pool.query('SELECT * FROM todos ORDER BY id');
        res.json(rows);
    });

    // CREATE todo
    app.post('/todos', async (req, res) => {
        const { title } = req.body;
        const id = uuidv4();

        const { rows } = await pool.query(
            'INSERT INTO todos(id, title) VALUES($1, $2) RETURNING *',
            [id, title],
        );

        res.status(201).json(rows[0]);
    });

    // UPDATE todo
    app.patch('/todos/:id', async (req, res) => {
        const { id } = req.params;
        const { completed, title } = req.body;

        const { rows } = await pool.query(
            `UPDATE todos 
       SET completed = COALESCE($1, completed),
           title = COALESCE($2, title)
       WHERE id = $3
       RETURNING *`,
            [completed, title, id],
        );

        res.json(rows[0]);
    });

    // DELETE todo
    app.delete('/todos/:id', async (req, res) => {
        const { id } = req.params;
        await pool.query('DELETE FROM todos WHERE id = $1', [id]);
        res.status(204).send();
    });

    app.listen(PORT, () => {
        console.log(`🚀 Backend running on port ${PORT}`);
    });
}

startServer();
