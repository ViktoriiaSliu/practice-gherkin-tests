import { browser } from '@wdio/globals';
export default class BasePage {

    static timeout = 7000;
    
    open(path) {
        browser.url(`https://practicesoftwaretesting.com/${path}`);
    }

    async waitForElement(element, timeout = this.timeout) {
        await element.waitForDisplayed({
            timeout: timeout,
            timeoutMsg: `Element was not displayed after ${timeout}ms`
        });
    }

    async click(element, timeout = this.timeout) {
        await element.waitForClickable({
            timeout: timeout,
            timeoutMsg: `Element was not clickable after ${timeout}ms`
        });
        await element.click();
    }

    static async waitUntil(conditionCallback, timeoutMsg = 'Condition not met in time', timeout = this.timeout) {
        await browser.waitUntil(async () => {
            return await conditionCallback();
        }, {
            timeout: timeout,
            timeoutMsg: timeoutMsg
        });
    }

    static async waitForAllElementsToIncludeText(elementsGetter, expectedText, timeoutMsg = 'Not all elements include expected text', timeout = BasePage.timeout) {
        await BasePage.waitUntil( 
            async () => {
                const elements = await elementsGetter(); 
                if (!elements || elements.length === 0) return false;

                const texts = await Promise.all(Array.from(elements).map(el => el.getText()));
                return texts.every(text => text.toLowerCase().includes(expectedText.toLowerCase()));
            },
            timeoutMsg,
            timeout
        );
    }

    static async waitUntilClickable(element, timeout = BasePage.timeout, timeoutMsg = '') {
    await element.waitForClickable({
        timeout,
        timeoutMsg: timeoutMsg || `Element was not clickable after ${timeout}ms`
    });
    }

    static async waitUntilUrlContains(expectedPart, timeout = this.timeout, timeoutMsg = `Expected URL to contain ${expectedPart}`) {
    return await browser.waitUntil(
        async () => (await browser.getUrl()).includes(expectedPart),
        { timeout, timeoutMsg }
    );
    }
    
}

