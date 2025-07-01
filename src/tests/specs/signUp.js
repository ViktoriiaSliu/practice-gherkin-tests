import {assert} from 'chai';
import {expect} from 'chai';
import {should} from 'chai';
should();

describe('Successful User Sign Up', () => {
    it('should allow a user to sign up with valid details', async () => {

        await browser.url('https://practicesoftwaretesting.com/auth/register');

        const firstNameInput = await $('input[formcontrolname="first_name"]');
        await firstNameInput.setValue('Test');
        (await firstNameInput.getValue()).should.equal('Test');

        const lastNameInput = await $('input[formcontrolname="last_name"]');
        await lastNameInput.setValue('User');
        (await lastNameInput.getValue()).should.equal('User');

        const dateOfBirthInput = await $('input[formcontrolname="dob"]');
        await dateOfBirthInput.click();
        await browser.keys(['0', '4', '.', '0', '5', '.', '1', '9', '9', '5']);
        await browser.keys('Tab');
        const dobValue = await dateOfBirthInput.getValue();
        assert.isNotEmpty(dobValue, 'Date of Birth should be filled');

        const streetInput = await $('input[formcontrolname="street"]');
        await streetInput.setValue('Franka');
        expect(await streetInput.getValue()).to.equal('Franka');

        const postalCodeInput = await $('input[formcontrolname="postal_code"]');
        await postalCodeInput.setValue('37500');
        assert.equal(await postalCodeInput.getValue(), '37500');

        const cityInput = await $('input[formcontrolname="city"]');
        await cityInput.setValue('Lviv');
        expect(await cityInput.getValue()).to.equal('Lviv');

        const stateInput = await $('input[formcontrolname="state"]');
        await stateInput.setValue('Lviv');
        (await stateInput.getValue()).should.equal('Lviv');

        const countryInput = await $('select[formcontrolname="country"]');
        await countryInput.click();
        const countryOption = await $('option[value="AL"]');
        await countryOption.click();
        const countryValue = await countryInput.getValue();
        assert.equal(countryValue, 'AL', 'Country should be AL');

        const phoneInput = await $('input[formcontrolname="phone"]');
        await phoneInput.setValue('380930055026');
        expect(await phoneInput.getValue()).to.equal('380930055026');

        const email = `testuser85@example.com`;
        const emailInput = await $('input[formcontrolname="email"]');
        await emailInput.setValue(email);
        assert.isTrue(email.includes('@example.com'), 'Email should include domain');

        const passwordInput = await $('input[id="password"]');
        await passwordInput.setValue('Strong#Password#123');
        (await passwordInput.getValue()).should.not.be.empty;

        const registerButton = await $('button[type="submit"]');
        await registerButton.click();

        const loginHeader = await $('h3=Login');
        await loginHeader.waitForDisplayed({ timeout: 5000 });
        const headerText = await loginHeader.getText();
        expect(headerText).to.equal('Login');

        const loginButton = await $('input[data-test="login-submit"]');
        await loginButton.waitForDisplayed({ timeout: 5000 });
        expect(await loginButton.isDisplayed()).to.be.true;
    });
});
