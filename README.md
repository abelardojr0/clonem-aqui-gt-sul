# Treino de GitHub Actions

API mínima, Postgres, uma tela em React e três testes. O workflow do GitHub Actions ainda não existe: ele é o exercício.

```
backend/     Express. GET /api/alunos
frontend/    React + Vite. Axios busca a API e mostra a lista
```

A migration cria a tabela `alunos` e insere Ana Souza, Bruno Lima e Carla Dias.

## Rodar na sua máquina

O banco sobe pelo Docker. Na raiz da pasta:

```powershell
docker compose up -d
```

O container abre na porta **5434**. Nesta máquina a 5432 e a 5433 já têm outros Postgres, e dois servidores não podem usar a mesma porta.

Credenciais locais (`docker-compose.yml`):

- usuário: `usuario_local`
- senha: `senha_local`
- banco: `banco_alunos`

No GitHub Actions as credenciais são outras (`usuario_ci` / `senha_ci`), de propósito: local e CI são bancos diferentes. A API, quando ninguém define `DATABASE_URL`, usa o padrão local em `backend/src/db.js`.

Back, no primeiro terminal:

```powershell
cd backend
npm install
npm run migrate
npm test
npm run dev
```

A API fica em http://127.0.0.1:3001/api/alunos

Front, em outro terminal:

```powershell
cd frontend
npm install
npm run dev
```

Abra http://127.0.0.1:5180. A porta padrão do Vite é 5173, mas nesta máquina ela já está ocupada por outro projeto, então este front usa a 5180. O Vite encaminha `/api` para a API, então o Axios chama o mesmo endereço da página.

Com os dois servidores no ar, o Cypress abre o Chrome sem você clicar:

```powershell
cd frontend
npm run e2e
```

`npm run e2e:open` abre a janela do Cypress, se quiser ver o teste acontecendo.

## Enviar a aplicação, ainda sem workflow

Na raiz da pasta:

```powershell
git init
git branch -M main
git remote add origin https://github.com/abelardojr0/teste-ci-treino.git
git add .
git commit -m "Sobe a API, a tela e os testes"
git push -u origin main
```

A aba Actions do repositório sugere o modelo **Node.js**. Esse arquivo é o ponto de partida do exercício.
