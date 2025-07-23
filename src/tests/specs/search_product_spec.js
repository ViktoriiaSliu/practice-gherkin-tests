import ProductListingPage from '../pageObjects/product_listing_page.js';
import BasePage from '../pageObjects/base_page.js';
import {expect} from 'chai';
import { testData } from '../data/test_data.js';

describe('Search for an Existing Product', () => {

    const productNameSearch = testData.products.hammer;

    it('should add product name in search field', async () => {

        await ProductListingPage.open('');

        await ProductListingPage.searchProduct(productNameSearch);

        const headerText = await ProductListingPage.searchResultTitle.getText();
        expect(headerText).to.include(productNameSearch);

    });


    it('should display all Hammer products when searched', async () => {

        await BasePage.waitForAllElementsToIncludeText( 
            () => ProductListingPage.searchResultProductName, 
            testData.products.hammer,
            'Expected all product titles to include "hammer"'
        );

        const productTitlesElements = await ProductListingPage.searchResultProductName;
        const productTitlesElementsArray = Array.from(productTitlesElements);
        const titlesText = await Promise.all(productTitlesElementsArray.map(el => el.getText()));
        console.log('Product titles:', titlesText);
        
        const allContainHammer = titlesText.every(title =>
            title.toLowerCase().includes(productNameSearch.toLowerCase())
        );
        expect(allContainHammer).to.be.true;

    });
});