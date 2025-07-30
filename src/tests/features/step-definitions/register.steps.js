import RegisterPage from '../../pageObjects/register_page.js';
import { Given, When, Then } from '@cucumber/cucumber';
import BasePage from '../../pageObjects/base_page.js';
import { expect } from 'chai';
import { testData } from '../../data/test_data.js';

const registerUrl = '/register';

Given('I am on the registration page', async () => {
  await RegisterPage.open();
  await BasePage.waitUntilUrlContains(
    registerUrl,
    BasePage.timeout,
    'Expected to be on registration page'
  );
  expect(await RegisterPage.registerButton.isDisplayed()).to.be.true;
});

When('I register a new user with valid details', async () => {
  await RegisterPage.registerUser(testData.user);
});

Then('I should see the login header', async () => {
  await RegisterPage.waitForElement(RegisterPage.loginHeader, 5000);
  const headerText = await RegisterPage.loginHeader.getText();
  const expectedHeaderText = testData.strings.loginHeader;
  expect(headerText).to.equal(expectedHeaderText);
});

Then('I should see the login button', async () => {
  await RegisterPage.waitForElement(RegisterPage.loginButton, 5000);
  expect(await RegisterPage.loginButton.isDisplayed()).to.be.true;
});
