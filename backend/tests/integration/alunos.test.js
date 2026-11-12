const request = require('supertest');
const { pool } = require('../../src/db');
const { createApp } = require('../../src/app');
const { migrate } = require('../../src/migrate');

const app = createApp();

jest.setTimeout(15000);

beforeAll(async () => {
  await migrate(pool);
});

afterAll(async () => {
  await pool.end();
});

describe('API de alunos', () => {
  it('responde no /health', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ ok: true });
  });

  it('devolve os 3 alunos criados pela migration', async () => {
    const response = await request(app).get('/api/alunos');

    expect(response.status).toBe(200);
    expect(response.body.resumo).toEqual({
      total: 3,
      nomes: ['Ana Souza', 'Bruno Lima', 'Carla Dias'],
    });
    expect(response.body.alunos.map((aluno) => aluno.nome)).toEqual([
      'Ana Souza',
      'Bruno Lima',
      'Carla Dias',
    ]);
  });
});
