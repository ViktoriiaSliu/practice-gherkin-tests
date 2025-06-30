describe('View Product Details', () => {
    it('should display correct details for Bolt Cutters', async () => {

        await browser.url('https://practicesoftwaretesting.com/');

        const productLink = await $('h5=Bolt Cutters');
        await productLink.click();

        await browser.pause(2000); 

        const productTitle = await $('h1[data-test="product-name"]');
        await expect(productTitle).toHaveText('Bolt Cutters');

        const description = await $('p[data-test="product-description"]');
        await expect(description).toBeDisplayed();
        const descriptionText = await description.getText();
        expect(descriptionText.length).toBeGreaterThan(0);

        const price = await $('span[data-test="unit-price"]');
        await expect(price).toBeDisplayed();
        const priceText = await price.getText();
        expect(priceText).toMatch(/\d/); 

        const productImage = await $('img[alt="Bolt Cutters"]');
        await expect(productImage).toBeDisplayed();
        const imageSrc = await productImage.getAttribute('src');
        expect(imageSrc).toMatch(/pliers03/i); 
    });
});
