import ProductListingPage from '../pageObjects/product_listing_page.js';
import { expect } from 'chai';
import { testData } from '../data/test_data.js';

const productDetailsName = testData.products.boltCutters;

describe('View Product Details', () => {
  it('should open product Bolt Cutters', async () => {
    await ProductListingPage.open('');

    await ProductListingPage.selectProduct(productDetailsName);
  });

  it('should display correct title for Bolt Cutters', async () => {
    const title = await ProductListingPage.productTitle.getText();
    expect(title).to.equal(productDetailsName);
  });

  it('should display correct description for Bolt Cutters', async () => {
    const descriptionText = await ProductListingPage.productDescription.getText();
    expect(descriptionText.length).to.be.greaterThan(0);
  });

  it('should display correct price for Bolt Cutters', async () => {
    const priceText = await ProductListingPage.productPrice.getText();
    expect(priceText).to.match(/\d/);
  });

  it('should display correct image for Bolt Cutters', async () => {
    const imageSrc = await ProductListingPage.productImage('Bolt Cutters').getAttribute('src');
    expect(imageSrc).to.match(/pliers03/i);
  });
});
