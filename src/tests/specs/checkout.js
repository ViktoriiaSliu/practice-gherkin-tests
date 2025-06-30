describe('Proceed to Checkout with Items in the Cart', () => {
    it('should complete the checkout process for Bolt Cutters', async () => {

        await browser.url('https://practicesoftwaretesting.com/');

        const productLink = await $('h5=Bolt Cutters');
        await productLink.click();

        const addToCartButton = await $('button[data-test="add-to-cart"]');
        await addToCartButton.click();

        await browser.pause(5000); 

        const cartIconBadge = await $('a[data-test="nav-cart"]');
        await cartIconBadge.click();

        const cartItem = await $('span[data-test="product-title"]');
        await expect(cartItem).toHaveText('Bolt Cutters');

        const proceedToCheckoutBtn = await $('button[data-test="proceed-1"]');
        await proceedToCheckoutBtn.click();

        const emailInput = await $('input[data-test="email"]');
        await emailInput.setValue('testuser85@example.com');

        const passwordInput = await $('input[data-test="password"]');
        await passwordInput.setValue('Strong#Password#123');

        const loginButton = await $('input[data-test="login-submit"]');
        await loginButton.click();

        const userIcon = await $('p[class="ng-star-inserted"]');
        await expect(userIcon).toBeDisplayed();

        const proceedToCheckoutBtn2 = await $('button[data-test="proceed-2"]');
        await proceedToCheckoutBtn2.click();

        const billingHeader = await $('h3');
        await billingHeader.waitForDisplayed({ timeout: 3000 });
        await expect(billingHeader).toHaveText('Billing Address');

        const streetInput = await $('input[data-test="street"]');
        await streetInput.setValue('Franka');

        const cityInput = await $('input[data-test="city"]');
        await cityInput.setValue('Lviv');

        const stateInput = await $('input[data-test="state"]');
        await stateInput.setValue('Lviv');

        const countryInput = await $('input[data-test="country"]');
        await countryInput.click();

        const postcodeInput = await $('input[data-test="postal_code"]');
        await postcodeInput.setValue('37500');

        const proceedToCheckoutBtn3 = await $('button[data-test="proceed-3"]');
        await proceedToCheckoutBtn3.click();

        const paymentHeader = await $('h3=Payment');
        await paymentHeader.waitForDisplayed({ timeout: 3000 });
        await expect(paymentHeader).toHaveText('Payment');

        const paymentMethod = await $('#payment-method');
        await paymentMethod.click();

        const creditCardOption = await $('option[value="credit-card"]');
        await creditCardOption.click();

        const cardNumberInput = await $('#credit_card_number');
        await cardNumberInput.setValue('4111-1111-1111-1111');

        const expiryInput = await $('#expiration_date');
        await expiryInput.setValue('12/2025');

        const cvvInput = await $('#cvv');
        await cvvInput.setValue('123');

        const cardHolderName = await $('#card_holder_name');
        await cardHolderName.setValue('Test User');

        const confirmButton = await $('button[data-test="finish"]');
        await confirmButton.click();

        const successPaymentMessage = await $('div[data-test="payment-success-message"]');
        await successPaymentMessage.waitForDisplayed({ timeout: 5000 });
        const paymentText = await successPaymentMessage.getText();
        expect(paymentText.toLowerCase()).toContain('payment was successful');
    });
});
