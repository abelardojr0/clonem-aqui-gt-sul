CREATE TABLE IF NOT EXISTS alunos (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL
);

INSERT INTO alunos (nome)
SELECT nome
FROM (
  VALUES
    ('Ana Souza'),
    ('Bruno Lima'),
    ('Carla Dias')
) AS seed(nome)
WHERE NOT EXISTS (SELECT 1 FROM alunos);
