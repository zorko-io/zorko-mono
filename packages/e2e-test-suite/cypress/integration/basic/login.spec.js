context('Login', () => {
  // beforeEach(() => {
  //   cy.visit('https://localhost:8080')
  // })


  it('Visit Login Page', function() {
    cy.visit('http://localhost:8080')

    cy.contains('Login')
  })

});
