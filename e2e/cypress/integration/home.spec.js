describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/')
  });

  it('Display', () => {
    cy.get('main')
      .contains('Chart')
      .should('have.text', 'Chart');

    cy.get('main')
      .contains('Deposit')
      .should('have.text', 'Deposit');

    cy.get('main')
      .contains('Orders')
      .should('have.text', 'Orders');
  })
});
