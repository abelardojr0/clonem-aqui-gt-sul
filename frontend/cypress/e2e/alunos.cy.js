describe('lista de alunos', () => {
  it('mostra os 3 alunos vindos da API', () => {
    cy.visit('/');
    cy.contains('h1', 'Alunos');
    cy.get('li').should('have.length', 3);
    cy.contains('li', 'Ana Souza');
    cy.contains('li', 'Bruno Lima');
    cy.contains('li', 'Carla Dias');
  });
});
