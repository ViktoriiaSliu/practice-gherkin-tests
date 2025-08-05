import { Given, When, Then, Before } from '@wdio/cucumber-framework';
import ProductDetailsPage from '../../pageObjects/product_detail_page.js';
import BasePage from '../../pageObjects/base_page.js';
import CartPage from '../../pageObjects/cart_page.js';
import RegisterPage from '../../pageObjects/register_page.js';
import LoginPage from '../../pageObjects/login_page.js';
import { expect } from 'chai';
import { testData } from '../../data/test_data.js';
import { usersToTests } from '../../data/users.js';

const getUserData = (userTest) => {
    const user = usersToTests.users[userTest];
    if (!user) {
        throw new Error(`User alias '${userTest}' not found in users.js`);
    }
    return user;
};

const validBillingDetails = testData.user;
const validCardDetails = testData.card;
const loginUrl = '/auth/login';

Before({ tags: '@checkout' }, async function () {
  const userStat = 'userStatic';
  const user = getUserData(userStat);

  await RegisterPage.open();
  console.log('Registering user before login scenario...');
  await RegisterPage.registerUser(user);

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
  }

  if (!redirected) {
    const errorExists = await RegisterPage.errorLoginMessage.isExisting();
    const errorDisplayed = errorExists ? await RegisterPage.errorLoginMessage.isDisplayed() : false;

    if (errorDisplayed) {
      console.warn('User already exists. Navigating to login page...');
      await LoginPage.open();
      await BasePage.waitUntilUrlContains(
        loginUrl,
        BasePage.timeout,
        'Expected to be on login page after redirect or manual open'
      );
    } else {
      throw new Error('Registration failed with no redirect or error message');
    }
  }
});

Given('I add a {string} to the cart', async (productName) => {
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

Then('I should see {string} in the cart', async (productName) => {
  const actualItemName = (await CartPage.cartItemTitle.getText()).trim();
  expect(actualItemName).to.equal(productName);
  await CartPage.proceedToCheckoutBtnCart.click();
});

When('I log in with valid credentials {string} and {string}', async (email, password) => {
  await browser.pause(2000);
  await CartPage.loginDuringCheckout(email, password);

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

Then('I should see a successful order message containing {string}', async (successMessage) => {
  const paymentText = await CartPage.paymentSuccessMessage.getText();
  expect(paymentText.toLowerCase()).to.include(successMessage.toLowerCase());
});
