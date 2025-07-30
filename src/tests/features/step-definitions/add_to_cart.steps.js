import { Given, When, Then } from '@cucumber/cucumber';
import ProductDetailsPage from '../../pageObjects/product_detail_page.js';
import { expect } from 'chai';
import { testData } from '../../data/test_data.js';

const expectedQuantity = testData.strings.quantityInput;

Given('I am on the Bolt Cutters product details page', async () => {
  await ProductDetailsPage.open('');
  await ProductDetailsPage.productLink.click();

  const actualProductTitle = await ProductDetailsPage.productTitle.getText();
  const expectedProductTitle = testData.products.boltCutters;
  await expect(actualProductTitle).to.equal(expectedProductTitle);
});

When('I set the quantity of product', async () => {
  await ProductDetailsPage.quantityInput.setValue(expectedQuantity);

  const injectedQuantity = await ProductDetailsPage.quantityInput.getValue();

  await expect(injectedQuantity).to.equal(expectedQuantity);
});

When('I add the product to the cart', async () => {
  await ProductDetailsPage.addToCartButton.click();
});

Then('I should see a success message indicating product were added', async () => {
  await ProductDetailsPage.successPopupMessage.waitForDisplayed({
    reverse: true,
    timeout: 120000,
  });

  const successText = await ProductDetailsPage.successMessage.getText();
  const expectedSuccessText = testData.strings.successAddMessageTxt;
  expect(successText.toLowerCase()).to.include(expectedSuccessText.toLowerCase());
});

Then('the basket icon should show the quantity of product', async () => {
  const basketCount = await ProductDetailsPage.getBasketCount();

  expect(basketCount).to.equal(expectedQuantity);
});
