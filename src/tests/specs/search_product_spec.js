import ProductListingPage from '../pageObjects/product_listing_page.js';
import {expect} from 'chai';
import { testData } from '../data/test_data.js';

describe('Search for an Existing Product', () => {
    it('should add product name in search field', async () => {

        await ProductListingPage.open('');

        await ProductListingPage.searchProduct(testData.products.hammer);

        await browser.waitUntil(async () => {
        const el = await ProductListingPage.searchResultTitle;
        if (!(await el.isDisplayed())) return false;
        const text = await el.getText();
        return text.includes(testData.products.hammer);
    }, {
        timeout: 5000,
        timeoutMsg: 'Expected search result title to be visible and contain product name'
    });
        const headerText = await ProductListingPage.searchResultTitle.getText();
        expect(headerText).to.include(testData.products.hammer);

    });


    it('should display all Hammer products when searched', async () => {

        await browser.waitUntil(async () => {
            const productTitles = await ProductListingPage.searchResultProductName;
            if (!productTitles || productTitles.length === 0) return false;
            const titlesText = await Promise.all(Array.from(productTitles).map(el => el.getText()));
            return titlesText.every(title => title.toLowerCase().includes(testData.products.hammer.toLowerCase()));
        }, {
            timeout: 5000,
            timeoutMsg: 'Expected all product titles to include "hammer"'
        });

        const productTitles = await ProductListingPage.searchResultProductName;
        const titlesText = await Promise.all(Array.from(productTitles).map(el => el.getText()));
        titlesText.forEach(title => {
            expect(title.toLowerCase()).to.include(testData.products.hammer.toLowerCase());
        });

    });
});