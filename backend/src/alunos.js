// Função pura: não acessa banco nem HTTP.
// O teste unitário cobre só ela. A rota fica para o teste de integração.
function resumirAlunos(alunos) {
  return {
    total: alunos.length,
    nomes: alunos.map((aluno) => aluno.nome),
  };
}

async function listarAlunos(db) {
  const result = await db.query('SELECT id, nome FROM alunos ORDER BY id');
  return result.rows;
}

module.exports = { resumirAlunos, listarAlunos };
