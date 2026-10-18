class AddToCartLocator {
    // Navigation Locators (Header navigation)
    static productsNavLink = "(//a[contains(@href, '/products')])[1]";
    static cartNavLink = "(//a[contains(@href, '/cart')])[1]";
    static homeNavLink = "(//a[contains(@href, '/home')])[1]";

    // Products Page Generic Elements
    static productCards = "(//div[contains(@class, 'card-body')])[1]";
    static productTitles = "h2.card-title";
    static allAddToCartButtons = "//button[contains(text(), 'Add to cart')]";

    // Notification / Toast Locators
    static successToast = "(//*[contains(text(), 'Item added successfully')])[1]";
    static outOfStockToast = "(//*[contains(text(), 'This item is currently unavailable')])[1]";
    static toastCloseButton = "(//button[contains(text(), 'Close')])[1]";

    // Dynamic Element Locators
    static getProductCard(productName) {
        return `(//div[contains(@class, 'card-body') and .//h2[normalize-space()='${productName}']])[1]`;
    }

    static getAddToCartBtn(productName) {
        return `(//div[contains(@class, 'card-body') and .//h2[normalize-space()='${productName}']]//button[contains(text(), 'Add to cart')])[1]`;
    }

    static getBuyNowBtn(productName) {
        return `(//div[contains(@class, 'card-body') and .//h2[normalize-space()='${productName}']]//button[contains(text(), 'Buy Now')])[1]`;
    }

    static getQuantityIncreaseBtn(productName) {
        return `(//div[contains(@class, 'card-body') and .//h2[normalize-space()='${productName}']]//button[text()='+'])[1]`;
    }

    static getQuantityDecreaseBtn(productName) {
        return `(//div[contains(@class, 'card-body') and .//h2[normalize-space()='${productName}']]//button[text()='-'])[1]`;
    }

    static getQuantityText(productName) {
        return `(//div[contains(@class, 'card-body') and .//h2[normalize-space()='${productName}']]//*[contains(text(), 'Qty:')])[1]`;
    }

    static getProductStockStatus(productName) {
        return `(//div[contains(@class, 'card-body') and .//h2[normalize-space()='${productName}']]//*[contains(text(), 'Available') or contains(text(), 'Out of Stock')])[1]`;
    }

    static getProductPrice(productName) {
        return `(//div[contains(@class, 'card-body') and .//h2[normalize-space()='${productName}']]//p[contains(text(), '₹')])[1]`;
    }
}

module.exports = AddToCartLocator;
