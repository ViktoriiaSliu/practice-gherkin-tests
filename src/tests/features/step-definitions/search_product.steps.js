import { Given, When, Then } from '@cucumber/cucumber';
import ProductListingPage from '../../pageObjects/product_listing_page.js';
import BasePage from '../../pageObjects/base_page.js';
import { expect } from 'chai';
import { testData } from '../../data/test_data.js';

const productNameSearch = testData.products.hammer;

Given('I am on the homepage', async () => {
  await ProductListingPage.open('');
});

When('I enter the testing product name in the search bar', async () => {
  await ProductListingPage.searchProduct(productNameSearch);
});

When('I click the search icon', async () => {
  const headerText = await ProductListingPage.searchResultTitle.getText();
  expect(headerText).to.include(productNameSearch);
});

Then('I should see all the testing product name in the results', async () => {
  await BasePage.waitForAllElementsToIncludeText(
    () => ProductListingPage.searchResultProductName,
    testData.products.hammer,
    'Expected all product titles to include "hammer"'
  );

  const productTitlesElements = await ProductListingPage.searchResultProductName;
  const productTitlesElementsArray = Array.from(productTitlesElements);
  const titlesText = await Promise.all(productTitlesElementsArray.map((el) => el.getText()));
  console.log('Product titles:', titlesText);

  const allContainHammer = titlesText.every((title) =>
    title.toLowerCase().includes(productNameSearch.toLowerCase())
  );
  expect(allContainHammer).to.be.true;
});
