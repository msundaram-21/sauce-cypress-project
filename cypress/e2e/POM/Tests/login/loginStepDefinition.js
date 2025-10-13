import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../Page/login/loginPage";

Given('I am on the login page of Saucedemo', function() {
    LoginPage.visit()
})

When('I enter username and password', function(dataTable) {
    LoginPage.fillUsername(dataTable.rawTable[1][0])
    LoginPage.fillPassword(dataTable.rawTable[1][1])
})

When('I click the login button', function() {
    LoginPage.submit()
})

When('I should be redirected to the product page', function() {
    LoginPage.verifyRedirect().should('include','/inventory.html')
})

Then('The page title should be {string}', function(expectedTitle) {
    LoginPage.verifyTitle().should('have.text', expectedTitle)
})

Then('I should see an error message {string}', function(expectedErrorMessage) {
    LoginPage.verifyLoginError().should('have.text', expectedErrorMessage)
})