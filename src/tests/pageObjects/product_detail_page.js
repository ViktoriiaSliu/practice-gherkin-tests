import BasePage from './base_page.js';

class ProductDetailsPage extends BasePage {

    get successPopupMessage() { return $('.ngx-toastr.toast-success'); }   

    get productTitle() { return $('h1[data-test="product-name"]'); }
    get quantityInput() { return $('input[data-test="quantity"]'); }
    get addToCartButton() { return $('#btn-add-to-cart'); }
    get successMessage() { return $('#toast-container'); }
    get basketIconBadge() { return $('[data-test="cart-quantity"]#lblCartCount'); }
    get productLink() { return $('//a[./div/img[@alt="Bolt Cutters"]]'); }

    async getBasketCount() {
        await this.basketIconBadge.waitForDisplayed({ timeout: 7000 });
        return await this.basketIconBadge.getText();
    }

}
export default new ProductDetailsPage();

