import { useEffect, useState } from 'react';
import axios from 'axios';

export default function App() {
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    axios
      .get('/api/alunos')
      .then((resposta) => setDados(resposta.data))
      .catch(() => setErro('Não consegui buscar os alunos.'));
  }, []);

  return (
    <main>
      <h1>Alunos</h1>
      {erro && <p className="erro">{erro}</p>}
      {!dados && !erro && <p>Carregando...</p>}
      {dados && (
        <>
          <p className="total">{dados.resumo.total} cadastrados</p>
          <ul>
            {dados.alunos.map((aluno) => (
              <li key={aluno.id}>{aluno.nome}</li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
