import express from 'express';
import pkg from 'pg';
const { Pool } = pkg;

const app = express();

const pool = new Pool({
  connectionString: "postgres://default:FByf67oZdWxG@ep-quiet-recipe-332125.us-east-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require"
});

// Criação das tabelas e campos no banco de dados
const createTables = async () => {
  try {
    const client = await pool.connect();
    await client.query(`
      CREATE TABLE IF NOT EXISTS sua_tabela (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(50) NOT NULL,
        idade INTEGER
      );
    `);
    client.release();
    console.log('Tabelas e campos criados com sucesso!');
  } catch (error) {
    console.error('Erro ao criar tabelas e campos:', error);
  }
};

createTables();

// Rota para executar a consulta SELECT
app.get('/dados', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM sua_tabela'); // Substitua "sua_tabela" pelo nome da tabela desejada

    res.json(result.rows);
    client.release();
  } catch (error) {
    console.error('Erro ao executar a consulta:', error);
    res.status(500).json({ error: 'Erro ao executar a consulta' });
  }
});

app.post('/dados', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query(`INSERT INTO public.sua_tabela(
        nome, idade)
        VALUES ('Vitoria', 15);`); // Substitua "sua_tabela" pelo nome da tabela desejada
  
      res.json(result.rows);
      client.release();
    } catch (error) {
      console.error('Deu certo:', error);
      res.status(500).json({ error: 'Deu certo' });
    }
  });
  

// Inicie o servidor da API
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor em execução na porta ${PORT}`);
});
