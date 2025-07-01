import {assert} from 'chai';
import {expect} from 'chai';
import {should} from 'chai';
should();

describe('View Product Details', () => {
    it('should display correct details for Bolt Cutters', async () => {

        await browser.url('https://practicesoftwaretesting.com/');

        const productLink = await $('h5=Bolt Cutters');
        await productLink.waitForClickable({ timeout: 5000 });
        await productLink.click();

        const productTitle = await $('h1[data-test="product-name"]');
        await productTitle.waitForDisplayed({ timeout: 5000 });

        const titleText = await productTitle.getText();
        titleText.should.equal('Bolt Cutters');

        const description = await $('p[data-test="product-description"]');
        await description.waitForDisplayed({ timeout: 5000 });
        const descriptionText = await description.getText();
        expect(descriptionText).to.be.a('string').that.is.not.empty;

        const price = await $('span[data-test="unit-price"]');
        await price.waitForDisplayed({ timeout: 5000 });
        const priceText = await price.getText();
        assert.match(priceText, /\d/, 'Price should contain digits');

        const productImage = await $('img[alt="Bolt Cutters"]');
        await productImage.waitForDisplayed({ timeout: 5000 });
        const imageSrc = await productImage.getAttribute('src');
        expect(imageSrc).to.match(/pliers03/i);
    });
});
