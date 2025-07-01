import {expect} from 'chai';
import {should} from 'chai';
should();

describe('Add Product to Cart', () => {
    it('should add 2 Bolt Cutters to the cart with success message and updated basket icon', async () => {

        await browser.url('https://practicesoftwaretesting.com/');

        const productLink = await $('h5=Bolt Cutters');
        await productLink.waitForClickable({ timeout: 5000 });
        await productLink.click();

        const productTitle = await $('h1[data-test="product-name"]');
        await productTitle.waitForDisplayed({ timeout: 5000 });
        const titleText = await productTitle.getText();
        titleText.should.equal('Bolt Cutters');

        const quantityInput = await $('input[data-test="quantity"]');
        await quantityInput.setValue('2');
        const quantityValue = await quantityInput.getValue();
        expect(quantityValue).to.equal('2');

        const addToCartButton = await $('button[data-test="add-to-cart"]');
        await addToCartButton.waitForClickable({ timeout: 5000 });
        await addToCartButton.click();

        const successMessage = await $('#toast-container');
        await successMessage.waitForDisplayed({ timeout: 5000 });
        const successText = await successMessage.getText();
        expect(successText.toLowerCase()).to.include('product added to shopping cart');

        const basketIconBadge = await $('span[data-test="cart-quantity"]');
        await basketIconBadge.waitForDisplayed({ timeout: 5000 });
        const basketCount = await basketIconBadge.getText();
        basketCount.should.equal('2');
    });
});
