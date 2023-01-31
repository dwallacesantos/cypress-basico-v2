Cypress.Commands.add('fillRequiredFields', user => {
    const options = { delay: 0 }

    cy.get('#firstName').type(user.firstName, options)
    cy.get('#lastName').type(user.lastName, options)
    cy.get('#email').type(user.email, options)
    cy.get('#open-text-area').type(user.text, options)
});


Cypress.Commands.add('uploadFile', (filename, action) => {
    cy.fixture(filename).as('file')

    return cy.get('#file-upload').selectFile({ contents: '@file', fileName: filename }, { action: action })
});