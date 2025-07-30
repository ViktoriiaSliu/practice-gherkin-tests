import { Given, When, Then } from '@wdio/cucumber-framework';
import ProductDetailsPage from '../../pageObjects/product_detail_page.js';
import BasePage from '../../pageObjects/base_page.js';
import CartPage from '../../pageObjects/cart_page.js';
import RegisterPage from '../../pageObjects/register_page.js';
import LoginPage from '../../pageObjects/login_page.js';
import { expect } from 'chai';
import { testData } from '../../data/test_data.js';

const validEmail = testData.loginUser.email;
const validPassword = testData.loginUser.password;
const validBillingDetails = testData.user;
const validCardDetails = testData.card;
const loginUrl = '/auth/login';

Given('I have a registered user', async () => {
  await RegisterPage.open();
  await RegisterPage.registerUser(testData.userStatic);

  try {
    await BasePage.waitUntilUrlContains(loginUrl, 5000);
  } catch {
    const exists = await RegisterPage.errorLoginMessage.isDisplayed();
    if (!exists) throw new Error('Registration failed and no error shown.');
  }
});

Then('I am on the login page', async () => {
  await LoginPage.open();
  await BasePage.waitUntilUrlContains(loginUrl, BasePage.timeout);
});

Given('I add product to the cart', async () => {
  await ProductDetailsPage.open('');
  await ProductDetailsPage.productLink.click();
  await ProductDetailsPage.addToCartButton.click();
  await BasePage.moveMouseToViewportCorner();
  await BasePage.forceHideElement('.ngx-toastr.toast-success');
  await ProductDetailsPage.successPopupMessage.waitForDisplayed({ reverse: true, timeout: 10000 });
});

When('I go to the cart page', async () => {
  await CartPage.cartIcon.waitForClickable({ timeout: 10000 });
  await CartPage.cartIcon.click();
});

Then('I should see product in the cart', async () => {
  const actualItemName = (await CartPage.cartItemTitle.getText()).trim();
  const expectedItemName = testData.products.boltCutters;
  expect(actualItemName).to.equal(expectedItemName);
  await CartPage.proceedToCheckoutBtnCart.click();
});

When('I login with valid credentials', async () => {
  await CartPage.loginDuringCheckout(validEmail, validPassword);

  expect(await CartPage.confirmMessage.isDisplayed()).to.be.false;

  await CartPage.proceedToCheckoutBtnLogin.click();
});

When('I enter valid billing details', async () => {
  await CartPage.fillBillingDetails(validBillingDetails);
  await CartPage.proceedToCheckoutBtnBill.click();
});

When('I enter valid payment details', async () => {
  await CartPage.fillPaymentDetails(validCardDetails);
  await CartPage.confirmButton.click();
});

Then('I should see a successful payment message', async () => {
  const paymentText = await CartPage.paymentSuccessMessage.getText();
  const expectedText = testData.strings.successPayment;
  expect(paymentText.toLowerCase()).to.include(expectedText.toLowerCase());
});
