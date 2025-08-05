import { Given, When, Then } from '@cucumber/cucumber';
import ProductDetailsPage from '../../pageObjects/product_detail_page.js';
import { expect } from 'chai';;

Given(/^I am on the "([^"]*)" product details page$/, async (productName) => {
  await ProductDetailsPage.open('');
  await ProductDetailsPage.productLink.click();

  const actualProductTitle = await ProductDetailsPage.productTitle.getText();
  await expect(actualProductTitle).to.equal(productName);
});

When(/^I set the amount to "([^"]*)"$/, async (quantity) => {
  await ProductDetailsPage.quantityInput.setValue(quantity);

  const injectedQuantity = await ProductDetailsPage.quantityInput.getValue();

  await expect(injectedQuantity).to.equal(quantity.toString());
});

When(/^I add the product to the cart$/, async () => {
  await ProductDetailsPage.addToCartButton.click();
});

Then(/^I should see a success message with text "([^"]*)"$/, async (successMessages) => {
  await ProductDetailsPage.successPopupMessage.waitForDisplayed({
    reverse: true,
    timeout: 120000,
  });

  const successText = await ProductDetailsPage.successMessage.getText();
  expect(successText.toLowerCase()).to.include(successMessages.toLowerCase());
});

Then(/^the basket icon should show the amount "([^"]*)"$/, async (quantity) => {
  const basketCount = await ProductDetailsPage.getBasketCount();

  expect(basketCount).to.equal(quantity.toString());
});
