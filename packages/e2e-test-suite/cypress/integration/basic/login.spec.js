import { LoginMarkers } from '@zorko/ui-markers'

context('Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
  });

  it('Login Successfully', function() {
    cy.contains('Login')

    let login = LoginMarkers.loginInput().toSelector();

    cy.get(login)
      .type('admin@email.com')
      .should('have.value', 'admin@email.com')

    let password = LoginMarkers.passwordInput().toSelector();
    cy.get(password)
      .type('qwerty')
      .should('have.value', 'qwerty')

    let submit = LoginMarkers.submit().toSelector();
    cy.get(submit).click()

    cy.url().should('include', '/admin')
  })

});
