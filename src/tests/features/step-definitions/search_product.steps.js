import { Given, When, Then } from '@cucumber/cucumber';
import ProductListingPage from '../../pageObjects/product_listing_page.js';
import BasePage from '../../pageObjects/base_page.js';
import { expect } from 'chai';
//import { testData } from '../../data/test_data.js';

//const productNameSearch = testData.products.hammer;

Given('I am on the homepage', async () => {
  await ProductListingPage.open('');
});

When('I enter the {string} product name in the search bar', async (productName) => {
  await ProductListingPage.searchInput.setValue(productName);
});

When('I click the search icon', async () => {
  await ProductListingPage.searchButton.click();
  //const headerText = await ProductListingPage.searchResultTitle.getText();
  //expect(headerText).to.include(productNameSearch);
});

Then('I should see all the {string} product name in the results', async (productName) => {
  await BasePage.waitForAllElementsToIncludeText(
    () => ProductListingPage.searchResultProductName,
    productName,
    'Expected all product titles to include "hammer"'
  );

  const productTitlesElements = await ProductListingPage.searchResultProductName;
  const productTitlesElementsArray = Array.from(productTitlesElements);
  const titlesText = await Promise.all(productTitlesElementsArray.map((el) => el.getText()));
  console.log('Product titles:', titlesText);

  const allContainHammer = titlesText.every((title) =>
    title.toLowerCase().includes(productName.toLowerCase())
  );
  expect(allContainHammer).to.be.true;
});
