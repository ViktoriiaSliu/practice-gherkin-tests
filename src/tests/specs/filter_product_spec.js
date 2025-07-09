import ProductListingPage from '../pageObjects/product_listing_page.js';
import {expect} from 'chai';

describe('Filter Products by Category', () => {
    it('should made check in checkbox Power tools', async () => {
        
        await ProductListingPage.open('');

        await ProductListingPage.filterByPowerTools();
       
    });

    it('should display only products in Power Tools category when filtered', async () => {
       
        await browser.waitUntil(async () => {
            const productTitles = await ProductListingPage.productPrices;
            return productTitles && productTitles.length > 0;
        }, {
            timeout: 5000,
            timeoutMsg: 'Expected at least one product to be displayed after filtering'
        });

        const productTitles = await ProductListingPage.productPrices;
        expect(productTitles.length).to.be.greaterThan(0);
    });
});