describe('Sort Products by Price: Low to High', () => {
    it('should sort products in ascending order when selected', async () => {
        
        await browser.url('https://practicesoftwaretesting.com/');

        const sortByDropdown = await $('select[data-test="sort"]');
        await sortByDropdown.click();

        const lowToHighOption = await $('option[value="price,asc"]');
        await lowToHighOption.click();

        await browser.pause(2000); 

        const priceElements = await $$('span[data-test="product-price"]');
        const prices = [];

        for (let i = 0; i < priceElements.length; i++) {
            let priceText = await priceElements[i].getText();
            priceText = priceText.replace('$', '').trim();
            prices.push(parseFloat(priceText));
        }

        for (let i = 0; i < prices.length - 1; i++) {
            expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
        }
    });
});
