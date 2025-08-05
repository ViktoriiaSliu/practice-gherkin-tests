import { Given, When, Then, Before } from '@cucumber/cucumber';
import { expect } from 'chai';
import LoginPage from '../../pageObjects/login_page.js';
import RegisterPage from '../../pageObjects/register_page.js';
import BasePage from '../../pageObjects/base_page.js';
import { usersToTests } from '../../data/users.js';


const loginUrl = '/auth/login';
const getUserData = (userTest) => {
    const user = usersToTests.users[userTest];
    if (!user) {
        throw new Error(`User alias '${userTest}' not found in users.js`);
    }
    return user;
};

Before({ tags: '@login' }, async function () {
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

Given('I am on the Login page', async () => {
  await LoginPage.open();
  console.log('Login page oppened');
  await BasePage.waitUntilUrlContains(loginUrl, BasePage.timeout, 'Expected to be on login page');
  await browser.pause(2000);
});

When(/^I log in with valid credentials "([^"]*)"$/, async (email) => {
	console.log(email);
  await LoginPage.emailInput.setValue(email);

});

When(/^I enter valid  "([^"]*)"$/, async (password) => {
	console.log(password);
	await LoginPage.passwordInput.setValue(password);
});

When(/^I click the login button$/, async () => {
		await LoginPage.loginButton.click();
    console.log('Login button clicked');
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
