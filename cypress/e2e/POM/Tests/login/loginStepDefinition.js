import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../Page/loginPage/loginPage";
import ProductPage from "../../Page/productPage/productPage";

// Scenario -1
Given('I am on the login page of Saucedemo', function () {
    LoginPage.visit()
})

When('I enter username and password', function (dataTable) {
    LoginPage.fillUsername(dataTable.rawTable[1][0])
    LoginPage.fillPassword(dataTable.rawTable[1][1])
})

When('I click the login button', function () {
    LoginPage.submit()
})

When('I should be redirected to the product page', function () {
    ProductPage.verifyRedirect().should('include', '/inventory.html')
})

Then('The page title should be {string}', function (expectedTitle) {
    ProductPage.verifyTitle().should('have.text', expectedTitle)
})

// Scenario - 2
Then('I should see an error message {string}', function (expectedErrorMessage) {
    LoginPage.verifyLoginError().should('have.text', expectedErrorMessage)
})

// Scenario - 3
When('I click the login button without entering credentials', function () {
    LoginPage.submit()
})

// Scenario - 4
Then('Check the page is broken', function () {
    ProductPage.verifyPageLoad().each(($img) => {
        cy.wrap($img).should('be.visible');
        cy.wrap($img).should(($img) => {
            expect($img[0].naturalHeight, 'Image height should be 0 for broken image').to.equal(0);
            expect($img[0].naturalWidth, 'Image width should be 0 for broken image').to.equal(0);

            const src = $img[0].src;
            expect(src, 'Image source should be incorrect').to.include('BreakTheUrl');
        });
    });
});