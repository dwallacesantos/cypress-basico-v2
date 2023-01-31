/// <reference types="Cypress"/>

import { faker } from '@faker-js/faker';

describe('Central de Atendimento ao Cliente TAT', () => {

    const user = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        text: faker.lorem.words()
    }

    const SUCCESS_MESSAGE = 'Mensagem enviada com sucesso.'
    const ERROR_REQUIRED_FIELDS = 'Valide os campos obrigatórios!'


    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('verify page title', () => {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('verify the success message when required fields are fill', () => {
        cy.fillRequiredFields(user)
        cy.get('.button').click()
        cy.get('.success').should('be.visible').contains(SUCCESS_MESSAGE)
    })


    it('verify if phone input only allow numbers', () => {
        cy.get('#phone')
            .type(faker.lorem.word())
            .should('have.value', '')
    })

    it('select one product', () => {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    context('radio validations', () => {

        it('check Elogio option', () => {
            cy.get('input[value="elogio"]')
                .check()
                .should('be.checked')
        });

        it('check each options', () => {
            cy.get('#support-type input')
                .should('have.length', 3)
                .each($radio => {
                    cy.wrap($radio)
                        .check()
                        .should('be.checked')
                })
        })
    })

    context('checkbox validation', () => {

        it('verify if phone input is required when check phone option', () => {
            cy.fillRequiredFields(user)
            cy.get('#phone-checkbox').check()
            cy.get('.button').click()
            cy.get('.error').should('be.visible').contains(ERROR_REQUIRED_FIELDS)
        })

        it('verify if uncheck phone option the phone input stop being required', () => {
            cy.get('#check input')
                .should('have.length', 2)
                .each($checkbox => {
                    cy.wrap($checkbox)
                        .check()
                        .should('be.checked')
                })

            cy.get('#phone').should('have.attr', 'required')

            cy.get('#check input')
                .should('have.length', 2)
                .last()
                .uncheck()

            cy.get('#phone').should('not.have.attr', 'required')
        })

    })
    
    it('verify drag and drop to choose files', () => {

        const filename = 'example.json'

        cy.uploadFile(filename, 'drag-drop')
            .then($input => {
                expect($input[0].files[0].name).to.eq(filename)
            })
    })

    context('privacy policy redirect', () => {

        it('verify the link target', () => {
            cy.get('a').should('have.attr', 'target', '_blank')
        });

        it('verify if correct page is open', () => {
            cy.get('a').invoke('removeAttr', 'target').click()
                .title().should('eq', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
        })
    })
})

function fillRequiredFields(user) {

    const options = { delay: 0 }

    this.getFirstName().type(user.firstName, options)
    this.getLastName().type(user.lastName, options)
    this.getEmail().type(user.email, options)
    this.getHowCanIHelp().type(user.text, options)
}