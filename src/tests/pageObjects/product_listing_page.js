import BasePage from './base_page.js';

class ProductListingPage extends BasePage {

    get searchInput() { return $('input[data-test="search-query"]'); }
    get searchButton() { return $('button[data-test="search-submit"]'); }
    get searchResultTitle() { return $('h3[_ngcontent-ng-c3197249892][data-test="search-caption"] span[_ngcontent-ng-c3197249892][data-test="search-term"]'); }
    get searchResultProductName() { return $$('h5.card-title[data-test="product-name"]'); }

    get sortByDropdown() { return $('select[data-test="sort"]'); }
    get sortLowToHighOption() { return $('option[value="price,asc"]'); }
    get productPrices() { return $$('span.float-end.text-muted > span[data-test="product-price"]'); }

    get categoryFilter() { return $('fieldset[_ngcontent-ng-c3197249892]'); }
    get powerToolsOption() { return $('label=Power Tools').$('input[type="checkbox"]'); }

    productLink(name) { return $(`h5=${name}`); }

    get productTitle() { return $('h1[data-test="product-name"]'); }
    get productDescription() { return $('p[data-test="product-description"]'); }
    get productPrice() { return $('span[data-test="unit-price"]'); }
    productImage(name) { return $(`img[alt="${name}"]`); }

    async searchProduct(name) {
        await this.searchInput.setValue(name);
        await this.searchButton.click();
    }

    async filterByPowerTools() {
        await this.powerToolsOption.click();
    }

    async sortByPriceLowToHigh() {
        await this.sortByDropdown.click();
        await this.sortLowToHighOption.click();
    }

    async selectProduct(name) {
        const product = await this.productLink(name);
        await product.waitForClickable({ timeout: 5000 });
        await product.click();
    }

}

export default new ProductListingPage();