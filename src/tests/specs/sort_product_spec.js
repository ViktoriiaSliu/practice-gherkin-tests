import ProductListingPage from '../pageObjects/product_listing_page.js';
import {expect} from 'chai';

describe('Sort Products by Price: Low to High', () => {
    it('should sort products in ascending order when selected', async () => {

        await ProductListingPage.open('');

        const firstPriceBefore = await ProductListingPage.productPrices[0].getText();

        await ProductListingPage.sortByPriceLowToHigh();

        await browser.waitUntil(async () => {
            const firstPriceAfter = await ProductListingPage.productPrices[0].getText();
            return firstPriceAfter !== firstPriceBefore;
        }, {
            timeout: 5000,
            timeoutMsg: 'Expected product list to update after sorting within 5s'
        });

    });
    it('should display products sorted by Price Low to High', async () => {

       const priceElements = await ProductListingPage.productPrices;

        expect(Array.isArray(priceElements), 'productPrices should be an array').to.be.true;
        expect(priceElements.length, 'No product price elements found').to.be.greaterThan(0);

        const priceElementsArray = Array.from(priceElements);
        const prices = await Promise.all(
            priceElementsArray.map(async el => {
                const text = await el.getText();
                return parseFloat(text.replace('$', '').trim());
            })
        );

        const isSorted = prices.every((price, idx, arr) => idx === 0 || arr[idx - 1] <= price);

        expect(isSorted, 'Prices are not sorted in ascending order').to.be.true;
    });
});