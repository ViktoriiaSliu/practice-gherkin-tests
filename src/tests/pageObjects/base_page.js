import { browser } from '@wdio/globals';
export default class BasePage {

    open(path) {
        browser.url(`https://practicesoftwaretesting.com/${path}`);
    }

    async waitForElement(element, timeout = 2000) {
        await element.waitForDisplayed({
            timeout: timeout,
            timeoutMsg: `Element ${element.selector} was not displayed after ${timeout} ms`
        });
    }
}

