import LoginPage from '../pageObjects/login_page.js';
import BasePage from '../pageObjects/base_page.js';
import RegisterPage from '../pageObjects/register_page.js';
import { expect } from 'chai';
import { testData } from '../data/test_data.js';

const loginUserData = testData.userStatic;
const loginUrl = '/auth/login';

describe('Successful User Login', () => {
  before(async () => {
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
      loginUrl,
      BasePage.timeout,
      'Expected to be redirected to login page'
    );
  });

  it('should allow a user to login with valid credentials', async () => {
    await LoginPage.open();

    await LoginPage.login(testData.loginUser.email, testData.loginUser.password);

    await BasePage.waitUntil(
      async () => (await browser.getUrl()).includes('/account'),
      'Expected to be redirected to account page after login',
      BasePage.timeout
    );

    const currentUrl = await browser.getUrl();
    expect(currentUrl).to.include('https://practicesoftwaretesting.com/account');
  });

  it('should display the My Account header', async () => {
    const headerText = await LoginPage.getDashboardHeaderText();
    const expectedHeaderText = testData.strings.acountHeaderTitle;
    expect(headerText).to.equal(expectedHeaderText);
  });
});
