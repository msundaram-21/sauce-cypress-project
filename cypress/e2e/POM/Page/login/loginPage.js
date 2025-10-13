class LoginPage {

    visit() {
        cy.visit('/');
    }

    fillUsername(username) {
        cy.get('#user-name').clear().type(username)
    }

    fillPassword(password) {
        cy.get('#password').clear().type(password)
    }

    submit() {
        cy.contains('LOGIN').click()
    }

    verifyRedirect() {
        return cy.url()
    }

    verifyTitle() {
        return cy.get('.product_label')
    }

    verifyLoginError() {
        return cy.get('h3[data-test]')
    }
}

export default new LoginPage()