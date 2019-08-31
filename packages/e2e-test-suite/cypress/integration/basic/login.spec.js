import { LoginMarkers } from '@zorko/ui-markers'

context('Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
  });

  it('Login Successfully', function() {
    cy.contains('Login')

    cy.get(LoginMarkers.loginAsSelector())
      .type('admin@email.com')
      .should('have.value', 'admin@email.com')

    cy.get('[data-test=password-input]')
      .type('qwerty')
      .should('have.value', 'qwerty')

    cy.get('[data-test=submit]').click()

    cy.url().should('include', '/admin')
  })

});
