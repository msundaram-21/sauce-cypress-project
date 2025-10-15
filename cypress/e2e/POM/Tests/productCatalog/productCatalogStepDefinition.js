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
    let sortValue = ''
    if (sortOption === 'Name (A to Z)')
        sortValue = 'az'
    else if (sortOption === 'Name (Z to A)')
        sortValue = 'za'
    else if (sortOption === 'Price (low to high)')
        sortValue = 'lohi'
    else
        sortValue = 'hilo'
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
        expect(productList, 'Products are in descending alphabetical order').to.deep.equal(sortedList)
    })
})

Then('The products should be sorted by price ascending', function () {
    const productList = []
    ProductPage.productPrice().each(($item) => {
        cy.wrap($item)
            .invoke('text')
            .then((text) => {
                const price = parseFloat(text.replace(/[^0-9.]/g, ''));
                productList.push(price)
            });
    }).then(() => {
        const sortedList = [...productList].sort((a, b) => a - b);
        expect(productList, 'Products are sorted by price ascending').to.deep.equal(sortedList)
    });
});

Then('The products should be sorted by price descending', function () {
    const productList = []
    ProductPage.productPrice().each(($item) => {
        cy.wrap($item)
            .invoke('text')
            .then((text) => {
                const price = parseFloat(text.replace(/[^0-9.]/g, ''));
                productList.push(price)
            });
    }).then(() => {
        const sortedList = [...productList].sort((a, b) => b - a);
        expect(productList, 'Products are sorted by price descending').to.deep.equal(sortedList)
    });
});