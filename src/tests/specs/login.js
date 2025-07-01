import {assert} from 'chai';
import {expect} from 'chai';
import {should} from 'chai';
should();

describe('Successful User Login', () => {
    it('should allow a user to login with valid credentials', async () => {

        await browser.url('https://practicesoftwaretesting.com/auth/login');

        const emailInput = await $('input[formcontrolname="email"]');
        await emailInput.setValue('testuser85@example.com');
        (await emailInput.getValue()).should.equal('testuser85@example.com');

        const passwordInput = await $('input[id="password"]');
        await passwordInput.setValue('Strong#Password#123');
        const passwordValue = await passwordInput.getValue();
        assert.isNotEmpty(passwordValue, 'Password input should not be empty');

        const loginButton = await $('input[type="submit"]');
        await loginButton.click();

        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('/account'),
            {
                timeout: 5000,
                timeoutMsg: 'Expected to be redirected to account page after login'
            }
        );

        const currentUrl = await browser.getUrl();
        expect(currentUrl).to.include('https://practicesoftwaretesting.com/account');

        const dashboardHeader = await $('h1');
        await dashboardHeader.waitForDisplayed({ timeout: 5000 });
        const headerText = await dashboardHeader.getText();
        headerText.should.equal('My account');
    });
});

