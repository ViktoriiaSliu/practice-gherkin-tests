import BasePage from './base_page.js';

class ProductDetailsPage extends BasePage {

    get productTitle() { return $('h1[data-test="product-name"]'); }
    get quantityInput() { return $('input[data-test="quantity"]'); }
    get addToCartButton() { return $('button[data-test="add-to-cart"]'); }
    get successMessage() { return $('#toast-container'); }
    get basketIconBadge() { return $('span[data-test="cart-quantity"]'); }
    get productLink() { return $('//a[./div/img[@alt="Bolt Cutters"]]'); }


    async openProduct() {
        await this.productLink.waitForClickable({ timeout: 5000 });
        await this.productLink.click();
    }

    async setQuantity(quantity) {
        await this.quantityInput.setValue(quantity);
    }

    async addToCart() {
        await this.addToCartButton.waitForClickable({ timeout: 5000 });
        await this.addToCartButton.click();
    }

    async waitForSuccessMessage() {
        await this.successMessage.waitForDisplayed({
            timeout: 5000,
            timeoutMsg: 'Success message did not appear within 5s'
        });
    }

    async getSuccessMessageText() {
        return await this.successMessage.getText();
    }

    async getBasketCount() {
        await this.basketIconBadge.waitForDisplayed({ timeout: 5000 });
        return await this.basketIconBadge.getText();
    }

}
export default new ProductDetailsPage();