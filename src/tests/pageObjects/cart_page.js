import BasePage from './base_page.js';

class CartPage extends BasePage {

    get cartIcon() { return $('[data-test="nav-cart"]'); }
    get cartItemTitle() { return $('span[data-test="product-title"]'); }

    get proceedToCheckoutBtnCart() { return $('button[data-test="proceed-1"]'); }
    get proceedToCheckoutBtnLogin() { return $('button[data-test="proceed-2"]'); }
    get proceedToCheckoutBtnBill() { return $('button[data-test="proceed-3"]'); }

    get emailInput() { return $('input[data-test="email"]'); }
    get passwordInput() { return $('input[data-test="password"]'); }
    get loginButton() { return $('input[data-test="login-submit"]'); }
    get confirmMessage() { return $('p[class="ng-star-inserted"]'); }

    get billingHeader() { return $('h3=Billing Address'); }
    get streetInput() { return $('input[data-test="street"]'); }
    get cityInput() { return $('input[data-test="city"]'); }
    get stateInput() { return $('input[data-test="state"]'); }
    get countryInput() { return $('input[data-test="country"]'); }
    get postcodeInput() { return $('input[data-test="postal_code"]'); }

    get paymentHeader() { return $('h3=Payment'); }
    get paymentMethodDropdown() { return $('#payment-method'); }
    get creditCardOption() { return $('option[value="credit-card"]'); }
    get cardNumberInput() { return $('#credit_card_number'); }
    get expiryInput() { return $('#expiration_date'); }
    get cvvInput() { return $('#cvv'); }
    get cardHolderNameInput() { return $('#card_holder_name'); }
    get confirmButton() { return $('button[data-test="finish"]'); }

    get paymentSuccessMessage() { return $('div[data-test="payment-success-message"]'); }

    async loginDuringCheckout(email, password) {
        await this.emailInput.setValue(email);
        await this.passwordInput.setValue(password);
        await this.loginButton.waitForClickable({ timeout: this.timeout });
        await this.loginButton.click();
    }

    async fillBillingDetails(user) {
        await this.streetInput.setValue(user.street);
        await this.cityInput.setValue(user.city);
        await this.stateInput.setValue(user.state);
        await this.countryInput.setValue(user.country);
        await this.postcodeInput.setValue(user.postalCode);
    }

    async fillPaymentDetails(card) {
        await this.paymentMethodDropdown.waitForClickable({ timeout: this.timeout });
        await this.paymentMethodDropdown.click();
        await this.creditCardOption.click();
        await this.cardNumberInput.setValue(card.number);
        await this.expiryInput.setValue(card.expiry);
        await this.cvvInput.setValue(card.cvv);
        await this.cardHolderNameInput.setValue(card.holderName);
    }
}
export default new CartPage();