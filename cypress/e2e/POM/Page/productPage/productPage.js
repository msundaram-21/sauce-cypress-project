class ProductPage {

    constructor() {
        this.selectors = {
            title: '.product_label',
            productImages: '.inventory_item img'
        };
    }

    verifyRedirect() {
        return cy.url()
    }

    verifyTitle() {
        return cy.get(this.selectors.title)
    }

    verifyPageLoad() {
        return cy.get(this.selectors.productImages)
    }
}
export default new ProductPage()