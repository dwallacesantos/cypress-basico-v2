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

    const MESSAGE_VISIBLE_TIME = 3000;


    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('verify page title', () => {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('verify the success message when required fields are fill', () => {
        cy.clock()
        cy.fillRequiredFields(user)
        cy.get('.button').click()
        cy.get('.success').should('be.visible').contains(SUCCESS_MESSAGE)
        cy.tick(MESSAGE_VISIBLE_TIME)
        cy.get('.success').should('not.be.visible')
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

        Cypress._.times(2, () => {
        it('verify if phone input is required when check phone option', () => {
            cy.clock()
            cy.fillRequiredFields(user)
            cy.get('#phone-checkbox').check()
            cy.get('.button').click()
            cy.get('.error').should('be.visible').contains(ERROR_REQUIRED_FIELDS)
            
            cy.tick(MESSAGE_VISIBLE_TIME)
            cy.get('.success').should('not.be.visible')
        })})

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

    it('verify messages', () => {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
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

    it('verify online page', () => {
        cy.request('GET', 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html').then((resp) => {
            const { status, body } = resp
            expect(status).to.eq(200)
            expect(body).contain('CAC TAT')
        })
    });

    it('verify hidden cat', () => {
        cy.get('#cat').invoke('show').should('be.visible')
        cy.get('#title').invoke('text', 'CAT TAT')
    });
})