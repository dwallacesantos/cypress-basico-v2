/// <reference types="Cypress"/>

import CacPage from '../page_objects/CacPage'
import { faker } from '@faker-js/faker';

describe('Central de Atendimento ao Cliente TAT', () => {

    const cacPage = new CacPage()

    const user = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        text: faker.lorem.words()
    }

    const SUCCESS_MESSAGE = 'Mensagem enviada com sucesso.'
    const ERROR_REQUIRED_FIELDS = 'Valide os campos obrigatórios!'


    beforeEach(() => {
        cacPage.visit()
    })

    it('verify page title', () => {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('verify the success message when required fields are fill', () => {
        cacPage.fillRequiredFields(user)
        cacPage.submit()
        cacPage.validateSuccessMessage(SUCCESS_MESSAGE)
    })


    it('verify if phone input only allow numbers', () => {
        cacPage.getPhone()
            .type(faker.lorem.word())
            .should('have.value', '')
    })

    it('select one product', () => {
        cacPage.getProduct()
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    context('radio validations', () => {

        it('check Elogio option', () => {
            cacPage.getComplimentRadioOption()
                .check()
                .should('be.checked')
        });

        it('check each options', () => {
            cacPage.getRadioOptions()
                .each($radio => {
                    cy.wrap($radio)
                        .check()
                        .should('be.checked')
                })
        })
    })

    context('checkbox validation', () => {

        it('verify if phone input is required when check phone option', () => {
            cacPage.fillRequiredFields(user)
            cacPage.getPhoneCheckBoxOption().check()
            cacPage.submit()
            cacPage.validateErrorMessage(ERROR_REQUIRED_FIELDS)
        })

        it('verify if uncheck phone option the phone input stop being required', () => {
            cacPage.getCheckBoxOptions()
                .each($checkbox => {
                    cy.wrap($checkbox)
                        .check()
                        .should('be.checked')
                })

            cacPage.getPhone().should('have.attr', 'required')

            cacPage.getCheckBoxOptions().last()
                .uncheck()

            cacPage.getPhone().should('not.have.attr', 'required')
        })

    })
    
    it('verify drag and drop to choose files', () => {

        const filename = 'example.json'

        cacPage.uploadfile(filename, 'drag-drop')
            .then($input => {
                expect($input[0].files[0].name).to.eq(filename)
            })
    })

    context('privacy policy redirect', () => {

        it('verify the link target', () => {
            cacPage.getPolicyLink().should('have.attr', 'target', '_blank')
        });

        it('verify if correct page is open', () => {
            cacPage.getPolicyLink().invoke('removeAttr', 'target').click()
                .title().should('eq', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
        })
    })
})
