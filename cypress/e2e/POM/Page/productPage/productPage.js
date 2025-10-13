class ProductPage {

    constructor() {
        this.selectors = {
            title: '.product_label',
            productImages: '.inventory_item img',
            productNames:'.inventory_item_name',
            productDescriptions: '.inventory_item_desc',
            productPrices: '.inventory_item_price',
            inventoryItems: '.inventory_item'
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

    verifyProductCount() {
        return cy.get(this.selectors.productNames)
    }

    getAllProducts() {
        return cy.get(this.selectors.inventoryItems)
    }

}
export default new ProductPage()