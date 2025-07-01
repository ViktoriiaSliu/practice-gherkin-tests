import {assert} from 'chai';
import {expect} from 'chai';
import {should} from 'chai';
should();

describe('Filter Products by Category', () => {
    it('should display only products in Power Tools category when filtered', async () => {
        await browser.url('https://practicesoftwaretesting.com/');

        await browser.pause(2000);

        const categoryFilter = await $('fieldset[_ngcontent-ng-c3197249892]');
        assert.isTrue(await categoryFilter.isExisting(), 'Category filter should exist');
        (await categoryFilter.isExisting()).should.be.true;

        const subFilters = await $(`//div[@class="checkbox"]`);
        expect(await subFilters.isExisting()).to.be.true;

        const powerToolsOption = await $('label=Power Tools').$('input[type="checkbox"]');
        await powerToolsOption.click();

        await browser.pause(2000);

        const productTitles = await $$('h5[data-test="product-name"]');
        const keywords = ['Sander', 'Drill', 'Saw'];
        for (let title of productTitles) {
            const text = await title.getText();

            const hasKeyword = keywords.some(keyword => text.includes(keyword));
            expect(hasKeyword).to.be.true;
        }})
    });
