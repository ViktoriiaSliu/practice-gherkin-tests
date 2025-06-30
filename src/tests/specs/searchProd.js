describe('Search for an Existing Product', () => {
    it('should display all Hammer products when searched', async () => {
       
        await browser.url('https://practicesoftwaretesting.com/');

        const searchInput = await $('input[data-test="search-query"]');
        await searchInput.setValue('Hammer');

        const searchButton = await $('button[data-test="search-submit"]');
        await searchButton.click();

        await browser.pause(2000);

        const productTitles = await $('span[data-test="search-term"]');

        for (let i = 0; i < productTitles.length; i++) {
            const titleText = await productTitles[i].getText();
            expect(titleText.toLowerCase()).toContain('hammer');
        }
    });
});
