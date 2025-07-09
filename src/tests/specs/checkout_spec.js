import ProductDetailsPage from '../pageObjects/product_detail_page.js';
import CartPage from '../pageObjects/cart_page.js';
import {expect} from 'chai';
import { testData } from '../data/test_data.js';


describe('Proceed to Checkout with Items in the Cart', () => {
    it('should open cart page and proceed with checkout', async () => {

        await ProductDetailsPage.open('');
        await ProductDetailsPage.openProduct();
        await ProductDetailsPage.addToCart();

        await browser.pause(5000);

        await CartPage.openCart();
        const cartItemText = (await CartPage.cartItemTitle.getText()).trim();
        expect(cartItemText).to.equal(testData.products.boltCutters);

        await CartPage.proceedToCheckoutStep1();

    });
    it('should let you login with valid credentials', async () => {
       
        await CartPage.loginDuringCheckout(testData.loginUser.email, testData.loginUser.password);

        expect(await CartPage.confirmMessage.isDisplayed()).to.be.false;

        await CartPage.proceedToCheckoutStep2();
    });

    it('should let you enter billing data', async () => {

        await CartPage.fillBillingDetails(testData.user);

        await CartPage.proceedToCheckoutStep3();

    });
    it('should let you enter payment data', async () => {

        await CartPage.fillPaymentDetails(testData.card);

        await CartPage.confirmPayment();

        const paymentText = await CartPage.paymentSuccessMessage.getText();
        expect(paymentText.toLowerCase()).to.include(testData.strings.successPayment.toLowerCase());
    });
});