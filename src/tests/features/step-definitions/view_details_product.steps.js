import { Given, When, Then } from '@cucumber/cucumber';
import ProductListingPage from '../../pageObjects/product_listing_page.js';
import { expect } from 'chai';
import { testData } from '../../data/test_data.js';

const productDetailsName = testData.products.boltCutters;

Given('I am on the product listing page', async () => {
  await ProductListingPage.open('');
});

When('I select the testing product', async () => {
  await ProductListingPage.selectProduct(productDetailsName);
});

Then('I should see the testing product title', async () => {
  const title = await ProductListingPage.productTitle.getText();
  expect(title).to.equal(productDetailsName);
});

Then('I should see a description for the testing product', async () => {
  const descriptionText = await ProductListingPage.productDescription.getText();
  expect(descriptionText.length).to.be.greaterThan(0);
});

Then('I should see the price for the testing product', async () => {
  const priceText = await ProductListingPage.productPrice.getText();
  expect(priceText).to.match(/\d/);
});

Then('I should see the image for the testing product', async () => {
  const imageSrc = await ProductListingPage.productImage('Bolt Cutters').getAttribute('src');
  expect(imageSrc).to.match(/pliers03/i);
});
