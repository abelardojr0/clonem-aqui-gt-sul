const express = require('express');
const cors = require('cors');
const { pool } = require('./db');
const { listarAlunos, resumirAlunos } = require('./alunos');

function createApp(db = pool) {
  const app = express();
  app.use(cors());

  app.get('/health', (_req, res) => {
    res.json({ ok: true });
  });

  app.get('/api/alunos', async (_req, res) => {
    try {
      const alunos = await listarAlunos(db);
      res.json({ alunos, resumo: resumirAlunos(alunos) });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'nao foi possivel listar os alunos' });
    }
  });

  return app;
}

module.exports = { createApp };
