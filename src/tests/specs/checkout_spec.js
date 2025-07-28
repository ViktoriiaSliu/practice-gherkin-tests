import ProductDetailsPage from '../pageObjects/product_detail_page.js';
import BasePage from '../pageObjects/base_page.js';
import CartPage from '../pageObjects/cart_page.js';
import RegisterPage from '../pageObjects/register_page.js';
import LoginPage from '../pageObjects/login_page.js';
import { expect } from 'chai';
import { testData } from '../data/test_data.js';

const validEmail = testData.loginUser.email;
const validPassword = testData.loginUser.password;
const validBillingDetails = testData.user;
const validCardDetails = testData.card;
const loginUserData = testData.userStatic;

describe('Proceed to Checkout with Items in the Cart', () => {
  before(async () => {
    await RegisterPage.open();

    await RegisterPage.registerUser(loginUserData);

    const loginUrl = '/auth/login';

    let redirected = false;
    try {
      await BasePage.waitUntilUrlContains(
        loginUrl,
        5000,
        'Waiting for redirect to login page after registration'
      );
      redirected = true;
    } catch (error) {
      console.log('No redirect to login page after registration, proceeding with login...', error);
      redirected = false;
    }

    if (!redirected) {
      const existsMsgDisplayed = await RegisterPage.errorLoginMessage.isDisplayed();
      if (existsMsgDisplayed) {
        console.warn('User already exists. Proceeding to login instead...');
      } else {
        throw new Error('Registration failed for unknown reason (no redirect or error message)');
      }
    }

    await LoginPage.open();

    await BasePage.waitUntilUrlContains(
      '/auth/login',
      BasePage.timeout,
      'Expected to be redirected to login page'
    );
  });

  it('should open cart page and proceed with checkout', async () => {
    await ProductDetailsPage.open('');

    await ProductDetailsPage.productLink.click();

    await ProductDetailsPage.addToCartButton.click();

    await BasePage.moveMouseToViewportCorner();

    await BasePage.forceHideElement('.ngx-toastr.toast-success');

    await ProductDetailsPage.successPopupMessage.waitForDisplayed({
      reverse: true,
      timeout: 10000,
    });

    await CartPage.cartIcon.waitForClickable({ timeout: 10000 });

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
