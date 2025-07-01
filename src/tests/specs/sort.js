import {assert} from 'chai';
import {expect} from 'chai';
import {should} from 'chai';
should();

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
            priceText.should.be.a('string'); 
            priceText.should.include('$'); 

            priceText = priceText.replace('$', '').trim();
            const priceNumber = parseFloat(priceText);

            assert.isNumber(priceNumber, 'Price should be a number after parsing');
            prices.push(priceNumber);
        }


        for (let i = 0; i < prices.length - 1; i++) {
            expect(prices[i]).to.be.at.most(prices[i + 1], `Price at index ${i} is greater than next price`);
        }
    });
});
