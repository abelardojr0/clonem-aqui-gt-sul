require('dotenv').config();

const fs = require('fs');
const path = require('path');
const { pool } = require('./db');

async function migrate(db = pool) {
  const dir = path.join(__dirname, '..', 'migrations');
  const files = fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.sql'))
    .sort();

  for (const file of files) {
    const sql = fs.readFileSync(path.join(dir, file), 'utf8');
    await db.query(sql);
    console.log(`migration ok: ${file}`);
  }
}

async function main() {
  try {
    await migrate();
  } finally {
    await pool.end();
  }
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

module.exports = { migrate };
