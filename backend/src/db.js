const { Pool } = require('pg');

// Se DATABASE_URL existir (como no GitHub Actions), usa ela.
// Se não existir, usa as credenciais do docker-compose desta pasta.
const connectionString =
  process.env.DATABASE_URL ||
  'postgres://usuario_local:senha_local@127.0.0.1:5434/banco_alunos';

const pool = new Pool({ connectionString });

module.exports = { pool };
