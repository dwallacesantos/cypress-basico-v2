/// <reference types="Cypress"/>


describe('Central de Atendimento ao Cliente TAT - Política de privacidade', () => {

    it('check the page title', () => {
        cy.visit('./src/privacy.html')
            .title()
                .should('eq', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
    })

})