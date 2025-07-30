import ProductListingPage from '../pageObjects/product_listing_page.js';
import BasePage from '../pageObjects/base_page.js';
import { expect } from 'chai';

describe('Filter Products by Category', () => {
  it('should made check in checkbox Power tools', async () => {
    await ProductListingPage.open('');

    await ProductListingPage.powerToolsOption.click();
  });

  it('should display only products in Power Tools category when filtered', async () => {
    await BasePage.waitUntil(async () => {
      const productTitles = await ProductListingPage.productPrices;
      return productTitles && productTitles.length > 0;
    }, 'Expected at least one product to be displayed after filtering');

    const expectedKeywords = ['grinder', 'sander', 'saw', 'drill'];

    const allMatch = await ProductListingPage.areAllProductTitlesInCategories(expectedKeywords);

    expect(allMatch, `Not all product titles include one of: ${expectedKeywords.join(', ')}`).to.be
      .true;
  });
});
