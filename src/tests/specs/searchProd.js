import {assert} from 'chai';
import {expect} from 'chai';
import {should} from 'chai';
should();

describe('Search for an Existing Product', () => {
    it('should display all Hammer products when searched', async () => {

        await browser.url('https://practicesoftwaretesting.com/');

        const searchInput = await $('input[data-test="search-query"]');
        await searchInput.setValue('Hammer');
        (await searchInput.getValue()).should.equal('Hammer');

        const searchButton = await $('button[data-test="search-submit"]');
        await searchButton.click();

        await browser.pause(2000);

        await browser.waitUntil(
            async () => (await $$('//div[@class="container"]')).length > 0,
            {
                timeout: 5000,
                timeoutMsg: 'Expected search results to appear'
            }
        );

        const productTitles = await $$('h5[data-test="product-name"]');

        assert.isAbove(productTitles.length, 0, 'At least one product should be displayed');

        for (let i = 0; i < productTitles.length; i++) {
            const titleText = await productTitles[i].getText();
            titleText.should.be.a('string');
            expect(titleText.toLowerCase()).to.include('hammer');
        }
    });
});
