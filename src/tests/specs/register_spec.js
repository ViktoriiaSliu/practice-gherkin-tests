import RegisterPage from '../pageObjects/register_page.js';
import { expect } from 'chai';
import { testData } from '../data/test_data.js';

describe('Successful User Sign Up', () => {
  it('should allow a user to sign up with valid details', async () => {
    await RegisterPage.open();

    await RegisterPage.registerUser(testData.user);
  });

  it('should display the login header', async () => {
    await RegisterPage.waitForElement(RegisterPage.loginHeader, 5000);
    const headerText = await RegisterPage.loginHeader.getText();
    const expectedHeaderText = testData.strings.loginHeader;
    expect(headerText).to.equal(expectedHeaderText);
  });

  it('should display the login button after registration', async () => {
    await RegisterPage.waitForElement(RegisterPage.loginButton, 5000);
    expect(await RegisterPage.loginButton.isDisplayed()).to.be.true;
  });
});
