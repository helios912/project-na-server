import express from 'express';
import cors from 'cors';
import pool from './db.js'; // наше підключення до Postgres
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Створення таблиці, якщо немає
await pool.query(`
CREATE TABLE IF NOT EXISTS todos (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE
);
`);

// CRUD
app.get('/todos', async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM todos ORDER BY id');
    res.json(rows);
});

app.post('/todos', async (req, res) => {
    const { title } = req.body;
    const id = uuidv4();
    const { rows } = await pool.query(
        'INSERT INTO todos(id, title) VALUES($1, $2) RETURNING *',
        [id, title],
    );
    res.status(201).json(rows[0]);
});

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

app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM todos WHERE id = $1', [id]);
    res.status(204).send();
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
