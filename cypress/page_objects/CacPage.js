class CacPage {

    visit() {
        cy.visit('./src/index.html')
    }

    getFirstName() {
        return cy.get('#firstName')
    }

    getLastName() {
        return cy.get('#lastName')
    }

    getPhone() {
        return cy.get('#phone')
    }

    getEmail() {
        return cy.get('#email')
    }

    getHowCanIHelp() {
        return cy.get('#open-text-area')
    }

    getPhoneOption() {
        return cy.get('#phone-checkbox')
    }

    getProduct() {
        return cy.get('#product')
    }

    getComplimentRadioOption() {
        return cy.get('input[value="elogio"]')
    }

    getPhoneCheckBoxOption() {
        return cy.get('#phone-checkbox')
    }

    getPolicyLink() {
        return cy.get('a')
    }

    fillRequiredFields(user) {

        const options = { delay: 0 }

        this.getFirstName().type(user.firstName, options)
        this.getLastName().type(user.lastName, options)
        this.getEmail().type(user.email, options)
        this.getHowCanIHelp().type(user.text, options)
    }

    getRadioOptions() {
        return cy.get('#support-type input')
        .should('have.length', 3)
    }

    getCheckBoxOptions() {
        return cy.get('#check input')
            .should('have.length', 2)
    }

    validateSuccessMessage(message) {
        return cy.get('.success').should('be.visible').contains(message)
    }

    validateErrorMessage(message) {
        return cy.get('.error').should('be.visible').contains(message)
    }

    submit() {
        return cy.get('.button').click()
    }

    uploadfile(filename, action) {

        cy.fixture(filename).as('file')

        return cy.get('#file-upload').selectFile({ contents: '@file', fileName: filename }, { action: action })
    }

}

export default CacPage