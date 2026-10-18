class CartLocator {
    // Header & Actions
    static checkoutButton = "(//button[contains(text(), 'Checkout')])[1]";
    static browseButton = "(//button[contains(text(), 'Browse')])[1]";
    static emptyCartMessage = "(//*[contains(text(), 'Your cart is Empty')])[1]";

    // Cart Items Generic
    static cartItems = "//div[contains(@class, 'card')] | //div[.//button[contains(text(), 'Remove')]]";
    static allRemoveButtons = "//button[contains(text(), 'Remove')]";

    // Dynamic Element Locators
    static getCartItem(productName) {
        return `(//div[.//h2[normalize-space()='${productName}'] or contains(., '${productName}')][.//button[contains(text(), 'Remove')]])[1]`;
    }

    static getCartItemTitle(productName) {
        return `(//h2[normalize-space()='${productName}'])[1]`;
    }

    static getCartItemRemoveBtn(productName) {
        return `(//div[.//h2[normalize-space()='${productName}'] or contains(., '${productName}')]//button[contains(text(), 'Remove')])[1]`;
    }

    static getCartItemIncreaseQtyBtn(productName) {
        return `(//div[.//h2[normalize-space()='${productName}'] or contains(., '${productName}')]//button[text()='+'])[1]`;
    }

    static getCartItemDecreaseQtyBtn(productName) {
        return `(//div[.//h2[normalize-space()='${productName}'] or contains(., '${productName}')]//button[text()='-'])[1]`;
    }

    static getCartItemQuantityText(productName) {
        return `(//div[.//h2[normalize-space()='${productName}'] or contains(., '${productName}')]//*[contains(text(), 'Qty:')])[1]`;
    }

    static getCartItemPrice(productName) {
        return `(//div[.//h2[normalize-space()='${productName}'] or contains(., '${productName}')]//p[contains(text(), '₹')])[1]`;
    }
}

module.exports = CartLocator;
