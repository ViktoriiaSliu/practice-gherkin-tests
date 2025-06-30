describe('Filter Products by Category', () => {
    it('should display only products in Power Tools category when filtered', async () => {
    
        await browser.url('https://practicesoftwaretesting.com/');


        const categoryFilter = await $('fieldset[_ngcontent-ng-c3197249892]');
        await categoryFilter.isFocused();

        const subFilters = await $(`//div[@class="checkbox"]`);
        await subFilters.isFocused();

        const powerToolsOption = await $('label=Power Tools').$('input[type="checkbox"]');
        await powerToolsOption.click();

        await browser.pause(2000); 
    });
});