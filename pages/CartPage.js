const BasePage = require("./BasePage");
const CartLocator = require("../locators/CartLocator");
const AddToCartLocator = require("../locators/AddToCartLocator");
const logger = require("../utils/Logger");
const { expect } = require("@playwright/test");

class CartPage extends BasePage {
    constructor(page) {
        super(page);
    }

    /**
     * Navigates to the Cart page via header navigation link
     */
    async navigateToCart() {
        logger.info("Navigating to Cart page");
        await this.click(AddToCartLocator.cartNavLink);
        await this.page.waitForLoadState("networkidle");
    }

    /**
     * Verifies that a specific product is visible in the cart
     * @param {string} productName
     */
    async verifyProductInCart(productName) {
        logger.info(`Verifying product '${productName}' is present in cart`);
        const titleSelector = CartLocator.getCartItemTitle(productName);
        await this.waitForVisible(titleSelector);
        await expect(this.locator(titleSelector)).toBeVisible();
    }

    /**
     * Verifies that a specific product is NOT present in the cart
     * @param {string} productName
     */
    async verifyProductNotInCart(productName) {
        logger.info(`Verifying product '${productName}' is not in cart`);
        const titleSelector = CartLocator.getCartItemTitle(productName);
        await expect(this.locator(titleSelector)).toHaveCount(0);
    }

    /**
     * Reads quantity for a product in the cart
     * @param {string} productName
     * @returns {Promise<string>}
     */
    async getProductQuantityInCart(productName) {
        const qtySelector = CartLocator.getCartItemQuantityText(productName);
        return await this.getText(qtySelector);
    }

    /**
     * Verifies item quantity in cart
     * @param {string} productName
     * @param {number|string} expectedQty
     */
    async verifyItemQuantity(productName, expectedQty) {
        logger.info(`Verifying quantity for ${productName} in cart equals ${expectedQty}`);
        const qtyText = await this.getProductQuantityInCart(productName);
        expect(qtyText).toContain(`Qty: ${expectedQty}`);
    }

    /**
     * Increases quantity of an item in the cart
     * @param {string} productName
     */
    async increaseQuantity(productName) {
        logger.info(`Increasing quantity for ${productName} in cart`);
        const plusBtn = CartLocator.getCartItemIncreaseQtyBtn(productName);
        await this.click(plusBtn);
        await this.wait(500);
    }

    /**
     * Decreases quantity of an item in the cart
     * @param {string} productName
     */
    async decreaseQuantity(productName) {
        logger.info(`Decreasing quantity for ${productName} in cart`);
        const minusBtn = CartLocator.getCartItemDecreaseQtyBtn(productName);
        await this.click(minusBtn);
        await this.wait(500);
    }

    /**
     * Removes an item from the cart
     * @param {string} productName
     */
    async removeItem(productName) {
        logger.info(`Removing product '${productName}' from cart`);
        const removeBtn = CartLocator.getCartItemRemoveBtn(productName);
        await this.scrollIntoView(removeBtn);
        await this.click(removeBtn);
        await this.wait(500);
    }

    /**
     * Verifies that the empty cart message is displayed
     */
    async verifyEmptyCartMessage() {
        logger.info("Verifying empty cart message");
        await this.waitForVisible(CartLocator.emptyCartMessage);
        await expect(this.locator(CartLocator.emptyCartMessage)).toBeVisible();
    }

    /**
     * Clicks the Browse button on an empty cart
     */
    async clickBrowse() {
        logger.info("Clicking Browse button from empty cart");
        await this.click(CartLocator.browseButton);
        await this.page.waitForLoadState("networkidle");
    }

    /**
     * Clicks the Checkout button on cart page
     */
    async clickCheckout() {
        logger.info("Clicking Checkout button");
        await this.click(CartLocator.checkoutButton);
    }
}

module.exports = CartPage;
