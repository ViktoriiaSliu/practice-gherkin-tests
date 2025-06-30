describe('Successful User Login', () => {
    it('should allow a user to login with valid credentials', async () => {
        
        await browser.url('https://practicesoftwaretesting.com/auth/login');

        const emailInput = await $('input[formcontrolname="email"]');
        await emailInput.setValue(`testuser85@example.com`); 

        const passwordInput = await $('input[id="password"]');
        await passwordInput.setValue('Strong#Password#123');

        const loginButton = await $('input[type="submit"]');
        await loginButton.click();

        await browser.pause(2000); 

        const currentUrl = await browser.getUrl();
        expect(currentUrl).toContain('https://practicesoftwaretesting.com/account');

        const dashboardHeader = await $('h1');
        await dashboardHeader.isEqual('My Account');
    });
});