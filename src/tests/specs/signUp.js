describe('Successful User Sign Up', () => {
    it('should allow a user to sign up with valid details', async () => {
        
        await browser.url('https://practicesoftwaretesting.com/auth/register');

        const firstNameInput = await $('input[formcontrolname="first_name"]');
        await firstNameInput.setValue('Test');

        const lastNameInput = await $('input[formcontrolname="last_name"]');
        await lastNameInput.setValue('User');

        const dateOfBirthInput = await $('input[formcontrolname="dob"]');
        await dateOfBirthInput.click();
        await browser.keys(['0', '4', '.', '0', '5', '.', '1', '9', '9', '5']);
        await browser.keys('Tab');
     
        const streetInput = await $('input[formcontrolname="street"]');
        await streetInput.setValue('Franka');

        const postalCodeInput = await $('input[formcontrolname="postal_code"]');
        await postalCodeInput.setValue('37500');

        const cityInput = await $('input[formcontrolname="city"]');
        await cityInput.setValue('Lviv');

        const stateInput = await $('input[formcontrolname="state"]');
        await stateInput.setValue('Lviv');

        const countryInput = await $('select[formcontrolname="country"]');
        await countryInput.click();

        const countryOption = await $('option[value="AL"]');
        await countryOption.click();

        const phoneInput = await $('input[formcontrolname="phone"]');
        await phoneInput.setValue('380930055026');

        const emailInput = await $('input[formcontrolname="email"]');
        await emailInput.setValue(`testuser85@example.com`);

        const passwordInput = await $('input[id="password"]');
        await passwordInput.setValue('Strong#Password#123');

        const registerButton = await $('button[type="submit"]');
        await registerButton.click();

        
        await browser.pause(3000);

        const currentHeader = await $('h3=Login');
        await expect(currentHeader).toHaveText('Login');


        const loginButton = await $('input[data-test="login-submit"]');
        await expect(loginButton).toBeDisplayed();
    });
});        