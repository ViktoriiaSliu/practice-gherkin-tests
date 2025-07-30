import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import LoginPage from '../../pageObjects/login_page.js';
import RegisterPage from '../../pageObjects/register_page.js';
import BasePage from '../../pageObjects/base_page.js';
import { testData } from '../../data/test_data.js';

const loginUserData = testData.userStatic;
const loginUrl = '/auth/login';

Given('I register a new user if not already registered', async () => {
  await RegisterPage.open();
  await RegisterPage.registerUser(loginUserData);

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
    const existsMsgDisplayed = await RegisterPage.errorLoginMessage.isDisplayed();
    if (existsMsgDisplayed) {
      console.warn('User already exists. Proceeding to login instead...');
    } else {
      throw new Error('Registration failed for unknown reason (no redirect or error message)');
    }
  }
});

Then('I am on the Login In page', async () => {
  await LoginPage.open();
  await BasePage.waitUntilUrlContains(loginUrl, BasePage.timeout, 'Expected to be on login page');
});

When('I log in with valid credentials', async () => {
  await LoginPage.login(testData.loginUser.email, testData.loginUser.password);
});

Then('I should be redirected to the account page', async () => {
  await BasePage.waitUntil(
    async () => (await browser.getUrl()).includes('/account'),
    'Expected to be redirected to account page after login',
    BasePage.timeout
  );

  const currentUrl = await browser.getUrl();
  expect(currentUrl).to.include('https://practicesoftwaretesting.com/account');
});

Then('I should see the {string} header', async (expectedHeaderText) => {
  const actualHeaderText = await LoginPage.getDashboardHeaderText();
  expect(actualHeaderText).to.equal(expectedHeaderText);
});
