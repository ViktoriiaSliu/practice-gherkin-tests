import ProductDetailsPage from '../pageObjects/product_detail_page.js';
import {expect} from 'chai';
import { testData } from '../data/test_data.js';

describe('Add Product to Cart', () => {
    const expectedQuantity = testData.strings.quantityInput;

    it('should open Bolt Cutters page', async () => {

        await ProductDetailsPage.open('');
        await ProductDetailsPage.productLink.click();
        await browser.pause(3000)

        const actualProductTitle  =  await ProductDetailsPage.productTitle.getText();
        const expectedProductTitle = testData.products.boltCutters;
        await expect(actualProductTitle).to.equal(expectedProductTitle );

    });

    it('should add 2 Bolt Cutters to the quantity input', async () => {

        await ProductDetailsPage.quantityInput.setValue(testData.strings.quantityInput);
        await browser.pause(3000)

        const injectedQuantity = await ProductDetailsPage.quantityInput.getValue();

        await expect(injectedQuantity).to.equal(expectedQuantity);

    });
    it('should add 2 Bolt Cutters to the cart with success message', async () => {

        await ProductDetailsPage.addToCartButton.click();
        await browser.pause(3000)

        const successText = await ProductDetailsPage.successMessage.getText();
        const expectedSuccessText = testData.strings.successAddMessageTxt;
        expect(successText.toLowerCase()).to.include(expectedSuccessText.toLowerCase());
    });

    it('should updated basket icon', async () => {
        await browser.pause(5000)

        const basketCount = await ProductDetailsPage.getBasketCount();
        expect(basketCount).to.equal(expectedQuantity);

    });

});
