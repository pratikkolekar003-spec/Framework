const BasePage = require("./BasePage");
const AddToCartLocator = require("../locators/AddToCartLocator");
const logger = require("../utils/Logger");
const { expect } = require("@playwright/test");

class AddToCartPage extends BasePage {
    constructor(page) {
        super(page);
    }

    /**
     * Navigates to the Products page via header navigation link
     */
    async navigateToProductsPage() {
        logger.info("Navigating to Products page via header link");
        await this.click(AddToCartLocator.productsNavLink);
        await this.page.waitForLoadState("networkidle");
        await this.waitForVisible(AddToCartLocator.productCards);
    }

    /**
     * Adds a specific product to the cart by its name
     * @param {string} productName
     */
    async addProductToCart(productName) {
        logger.info(`Adding product to cart: ${productName}`);
        const addBtnSelector = AddToCartLocator.getAddToCartBtn(productName);
        await this.scrollIntoView(addBtnSelector);
        await this.click(addBtnSelector);
    }

    /**
     * Increases product quantity on product card
     * @param {string} productName
     * @param {number} times
     */
    async increaseProductQuantity(productName, times = 1) {
        logger.info(`Increasing quantity for ${productName} by ${times}`);
        const plusBtnSelector = AddToCartLocator.getQuantityIncreaseBtn(productName);
        await this.scrollIntoView(plusBtnSelector);
        for (let i = 0; i < times; i++) {
            await this.click(plusBtnSelector);
            await this.wait(300);
        }
    }

    /**
     * Decreases product quantity on product card
     * @param {string} productName
     * @param {number} times
     */
    async decreaseProductQuantity(productName, times = 1) {
        logger.info(`Decreasing quantity for ${productName} by ${times}`);
        const minusBtnSelector = AddToCartLocator.getQuantityDecreaseBtn(productName);
        await this.scrollIntoView(minusBtnSelector);
        for (let i = 0; i < times; i++) {
            await this.click(minusBtnSelector);
            await this.wait(300);
        }
    }

    /**
     * Retrieves current quantity displayed on product card
     * @param {string} productName
     * @returns {Promise<string>}
     */
    async getProductQuantity(productName) {
        const qtySelector = AddToCartLocator.getQuantityText(productName);
        return await this.getText(qtySelector);
    }

    /**
     * Verifies the success toast message ("Item added successfully🤗 !")
     */
    async verifySuccessToast() {
        logger.info("Verifying item added success notification");
        await this.waitForVisible(AddToCartLocator.successToast);
        await expect(this.locator(AddToCartLocator.successToast)).toBeVisible();
    }

    /**
     * Verifies the out-of-stock toast message ("This item is currently unavailable☹️ !")
     */
    async verifyOutOfStockToast() {
        logger.info("Verifying out of stock notification");
        await this.waitForVisible(AddToCartLocator.outOfStockToast);
        await expect(this.locator(AddToCartLocator.outOfStockToast)).toBeVisible();
    }

    /**
     * Closes the toast notification if visible
     */
    async closeToast() {
        if (await this.isVisible(AddToCartLocator.toastCloseButton)) {
            logger.info("Closing toast notification");
            await this.click(AddToCartLocator.toastCloseButton);
        }
    }

    /**
     * Reads current count displayed on Cart nav link (e.g. "Cart 1" -> 1, or "Cart" -> 0)
     * @returns {Promise<number>}
     */
    async getCartBadgeCount() {
        const supLocator = this.page.locator("(//a[contains(@href, '/cart')])[1]//sup");
        if (await supLocator.count() > 0) {
            const supText = await supLocator.textContent();
            const count = parseInt(supText.trim(), 10);
            if (!isNaN(count)) return count;
        }
        const text = await this.getText(AddToCartLocator.cartNavLink);
        const match = text ? text.match(/Cart\s*\(?(\d+)\)?/i) : null;
        return match ? parseInt(match[1], 10) : 0;
    }

    /**
     * Verifies cart count in the header navigation
     * @param {number} expectedCount
     */
    async verifyCartBadgeCount(expectedCount) {
        logger.info(`Verifying cart badge count equals ${expectedCount}`);
        const actualCount = await this.getCartBadgeCount();
        expect(actualCount).toBe(expectedCount);
    }

    /**
     * Navigates to the Cart page via header link
     */
    async navigateToCart() {
        logger.info("Navigating to Cart page via header link");
        await this.click(AddToCartLocator.cartNavLink);
        await this.page.waitForLoadState("networkidle");
    }
}

module.exports = AddToCartPage;
