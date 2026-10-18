const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

/**
 * ============================================================
 *                 ADD TO CART & CART STEPS
 * ============================================================
 */

Given("the user navigates to the products page", async function () {
    await this.testContext.pageManager
        .getAddToCartPage()
        .navigateToProductsPage();
});

When("the user adds product {string} to the cart", async function (productName) {
    await this.testContext.pageManager
        .getAddToCartPage()
        .addProductToCart(productName);
});

When("the user increases the quantity for product {string} by {int}", async function (productName, times) {
    await this.testContext.pageManager
        .getAddToCartPage()
        .increaseProductQuantity(productName, times);
});

When("the user closes the toast notification", async function () {
    await this.testContext.pageManager
        .getAddToCartPage()
        .closeToast();
});

Then("the user should see the success notification {string}", async function (expectedMessage) {
    await this.testContext.pageManager
        .getAddToCartPage()
        .verifySuccessToast();
});

Then("the user should see the out of stock notification {string}", async function (expectedMessage) {
    await this.testContext.pageManager
        .getAddToCartPage()
        .verifyOutOfStockToast();
});

Then("the cart badge count should be {int}", async function (expectedCount) {
    await this.testContext.pageManager
        .getAddToCartPage()
        .verifyCartBadgeCount(expectedCount);
});

When("the user navigates to the cart page", async function () {
    await this.testContext.pageManager
        .getCartPage()
        .navigateToCart();
});

Then("the product {string} should be displayed in the cart", async function (productName) {
    await this.testContext.pageManager
        .getCartPage()
        .verifyProductInCart(productName);
});

Then("the product {string} should have quantity {int} in the cart", async function (productName, expectedQty) {
    await this.testContext.pageManager
        .getCartPage()
        .verifyItemQuantity(productName, expectedQty);
});

When("the user removes the product {string} from the cart", async function (productName) {
    await this.testContext.pageManager
        .getCartPage()
        .removeItem(productName);
});

Then("the product {string} should not be present in the cart", async function (productName) {
    await this.testContext.pageManager
        .getCartPage()
        .verifyProductNotInCart(productName);
});

Then("the user should see the empty cart message {string}", async function (expectedText) {
    await this.testContext.pageManager
        .getCartPage()
        .verifyEmptyCartMessage();
});

When("the user clicks the browse button", async function () {
    await this.testContext.pageManager
        .getCartPage()
        .clickBrowse();
});

Then("the user should be on the products page", async function () {
    await expect(this.testContext.page).toHaveURL(/.*\/products\/?/);
});
