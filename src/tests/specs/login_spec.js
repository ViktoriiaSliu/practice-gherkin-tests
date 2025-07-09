import LoginPage from '../pageObjects/login_page.js';
import {expect} from 'chai';
import { testData } from '../data/test_data.js';

describe('Successful User Login', () => {
    it('should allow a user to login with valid credentials', async () => {

        await LoginPage.open();
        
        await LoginPage.login(testData.loginUser.email, testData.loginUser.password);

        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('/account'),
            {
                timeout: 5000,
                timeoutMsg: 'Expected to be redirected to account page after login'
            }
        );
    });
    it('should display the My Account header', async () => {

        const currentUrl = await browser.getUrl();
        expect(currentUrl).to.include('https://practicesoftwaretesting.com/account');
        
        const headerText = await LoginPage.getDashboardHeaderText();
        expect(headerText).to.equal(testData.strings.acountHeaderTitle);
    });
});