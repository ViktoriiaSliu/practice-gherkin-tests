import ProductDetailsPage from '../pageObjects/product_detail_page.js';
import BasePage from '../pageObjects/base_page.js';
import CartPage from '../pageObjects/cart_page.js';
import {expect} from 'chai';
import { testData } from '../data/test_data.js';


describe('Proceed to Checkout with Items in the Cart', () => {

    const validEmail = testData.loginUser.email;
    const validPassword = testData.loginUser.password;
    const validBillingDetails = testData.user;
    const validCardDetails = testData.card;

    it('should open cart page and proceed with checkout', async () => {

        await ProductDetailsPage.open('');
        await ProductDetailsPage.productLink.click();
        await ProductDetailsPage.addToCartButton.click();

        await ProductDetailsPage.successPopupMessage.waitForDisplayed({ reverse: true, timeout: 10000 });

        await BasePage.waitUntilClickable(CartPage.cartIcon, BasePage.timeout, 'Cart icon not clickable');

        await CartPage.cartIcon.click();

        const cartItemName = (await CartPage.cartItemTitle.getText()).trim();
        const expectedItemName = testData.products.boltCutters;
        expect(cartItemName).to.equal(expectedItemName);

        await CartPage.proceedToCheckoutBtnCart.click();

    });
    
    it('should let you login with valid credentials', async () => {
       
        await CartPage.loginDuringCheckout(validEmail, validPassword);

        expect(await CartPage.confirmMessage.isDisplayed()).to.be.false;

        await CartPage.proceedToCheckoutBtnLogin.click();
    });

    it('should let you enter billing data', async () => {

        await CartPage.fillBillingDetails(validBillingDetails);

        await CartPage.proceedToCheckoutBtnBill.click();

    });
    it('should let you enter payment data', async () => {

        await CartPage.fillPaymentDetails(validCardDetails);

        await CartPage.confirmButton.click();

        const paymentText = await CartPage.paymentSuccessMessage.getText();
        const expectedpaymentText = testData.strings.successPayment;
        expect(paymentText.toLowerCase()).to.include(expectedpaymentText.toLowerCase());
    });
});