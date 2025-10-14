import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../Page/loginPage/loginPage";
import ProductPage from "../../Page/productPage/productPage";

Given('I am logged in as', function (dataTable) {
    LoginPage.visit();
    LoginPage.fillUsername(dataTable.rawTable[1][0]);
    LoginPage.fillPassword(dataTable.rawTable[1][1]);
    LoginPage.submit();
});

When('I am on the products page', function () {
    ProductPage.verifyRedirect().should('include', '/inventory.html')
    ProductPage.verifyTitle().should('have.text', "Products")
})

When('I should see 6 products displayed', function () {
    ProductPage.productNames().should('have.length', 6)
})

Then('Each products should have a name, description, and price', function () {
    ProductPage.getAllProducts().each(($item) => {
        cy.wrap($item)
            .find(ProductPage.selectors.productNames)
            .should('be.visible')
            .and('not.be.empty')
        cy.wrap($item)
            .find(ProductPage.selectors.productDescriptions)
            .should('be.visible')
            .and('not.be.empty')
        cy.wrap($item)
            .find(ProductPage.selectors.productPrices)
            .should('be.visible')
            .and('contain', '$')
    })
})

When('I select the sort option {string} from the dropdown', function (sortOption) {
    const sortValue = sortOption === 'Name (A to Z)' ? 'az' : 'za'
    ProductPage.selectSort().select(sortValue)
})

Then('The products should be sorted alphabetically by name ascending', function () {
    const productList = []
    ProductPage.productNames().each(($item) => {
        cy.wrap($item)
            .invoke('text')
            .then((text) => {
                productList.push(text.trim())
            });
    }).then(() => {
        const sortedList = [...productList].sort((a, b) => a.localeCompare(b))
        expect(productList, 'Products are in ascending alphabetical order').to.deep.equal(sortedList)
    })
})

Then('The products should be sorted alphabetically by name descending', function () {
    const productList = []
    ProductPage.productNames().each(($item) => {
        cy.wrap($item)
            .invoke('text')
            .then((text) => {
                productList.push(text.trim())
            });
    }).then(() => {
        const sortedList = [...productList].sort((a, b) => a.localeCompare(a))
        expect(productList, 'Products are in ascending alphabetical order').to.deep.equal(sortedList)
    })
})