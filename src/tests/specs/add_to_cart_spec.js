import ProductDetailsPage from '../pageObjects/product_detail_page.js';
import {expect} from 'chai';
import { testData } from '../data/test_data.js';

describe('Add Product to Cart', () => {

    it('should open Bolt Cutters page', async () => {

        await ProductDetailsPage.open('');
        await ProductDetailsPage.openProduct();

        await expect(await ProductDetailsPage.productTitle.getText()).to.equal(testData.products.boltCutters);

    });

    it('should add 2 Bolt Cutters to the quantity input', async () => {

        await ProductDetailsPage.setQuantity(testData.strings.quantityInput);

        await expect(await ProductDetailsPage.quantityInput.getValue()).to.equal(testData.strings.quantityInput);

    });
    it('should add 2 Bolt Cutters to the cart with success message', async () => {

        await ProductDetailsPage.addToCart();

        await ProductDetailsPage.waitForSuccessMessage();

        const successText = await ProductDetailsPage.getSuccessMessageText();
        expect(successText.toLowerCase()).to.include(testData.strings.successAddMessageTxt.toLowerCase());
    });

    it('should updated basket icon', async () => {

        const basketCount = await ProductDetailsPage.getBasketCount();
        expect(basketCount).to.equal(testData.strings.quantityInput);

    });

});
