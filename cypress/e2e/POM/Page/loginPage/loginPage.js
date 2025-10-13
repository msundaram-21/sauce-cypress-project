class LoginPage {

    constructor() {
        this.selectors = {
            username: '#user-name',
            password: '#password',
            loginButton: 'LOGIN',
            errorMessage: 'h3[data-test]'
        };
    }

    visit() {
        cy.visit('/');
    }

    fillUsername(username) {
        cy.get(this.selectors.username)
            .should('be.visible')
            .clear()
            .type(username)
    }

    fillPassword(password) {
        cy.get(this.selectors.password)
            .should('be.visible')
            .clear()
            .type(password)
    }

    submit() {
        cy.contains(this.selectors.loginButton)
            .should('be.visible')
            .click()
    }

    verifyLoginError() {
        return cy.get(this.selectors.errorMessage)
    }
}
export default new LoginPage()