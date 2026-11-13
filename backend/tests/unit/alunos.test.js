const { resumirAlunos } = require('../../src/alunos');

describe('resumirAlunos', () => {
  it('resume uma lista vazia', () => {
    expect(resumirAlunos([])).toEqual({ total: 0, nomes: [] });
  });

  it('conta e devolve os nomes na mesma ordem', () => {
    const resumo = resumirAlunos([
      { id: 1, nome: 'Ana Teste Souza' },
      { id: 2, nome: 'Bruno Lima' },
    ]);

    expect(resumo).toEqual({
      total: 2,
      nomes: ['Ana Souza', 'Bruno Lima'],
    });
  });
});
