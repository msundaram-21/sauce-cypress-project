class ProductPage {

    constructor() {
        this.selectors = {
            title: '.product_label',
            productImages: '.inventory_item img',
            productNames:'.inventory_item_name',
            productDescriptions: '.inventory_item_desc',
            productPrices: '.inventory_item_price',
            inventoryItems: '.inventory_item',
            sortDropdown: '.product_sort_container'
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

    productNames() {
        return cy.get(this.selectors.productNames)
    }

    getAllProducts() {
        return cy.get(this.selectors.inventoryItems)
    }

    selectSort() {
        return cy.get(this.selectors.sortDropdown)
    }

}
export default new ProductPage()