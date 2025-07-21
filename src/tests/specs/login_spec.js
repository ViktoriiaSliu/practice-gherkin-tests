import LoginPage from '../pageObjects/login_page.js';
import BasePage from '../pageObjects/base_page.js';
import RegisterPage from '../pageObjects/register_page.js';
import {expect} from 'chai';
import { testData } from '../data/test_data.js';

describe('Successful User Login', () => {

    const loginUserData = testData.userStatic;

    before(async () => {

        await RegisterPage.open();

        await RegisterPage.registerUser(loginUserData);

        await BasePage.waitUntil(
            async () => (await browser.getUrl()).includes('/auth/login'),
            'Expected to be redirected to login page after registration',
            BasePage.timeout
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