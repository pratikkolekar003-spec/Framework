class DashboardPageLocator {
    // Header & Navigation
    static homeNavLink = "(//a[contains(@href, '/home')])[1]";
    static productsNavLink = "(//a[contains(@href, '/products')])[1]";
    static cartNavLink = "(//a[contains(@href, '/cart')])[1]";
    static contactNavLink = "(//a[contains(@href, '/contact')])[1]";
    static ordersNavLink = "(//a[contains(@href, '/orders')])[1]";
    static logoutButton = "(//button[contains(text(), 'Logout')])[1]";

    // Popup / Toast Notification
    // Preserves existing popupCapture property for backwards-compatibility
    static popupCapture = "div.bg-green-400.text-white";
    static loginSuccessPopup = "(//div[contains(@class, 'bg-green-400') or contains(., 'Login Successful')])[1]";

    // Main Banner & Headings
    static mainBannerHeading = "//*[contains(text(), 'Practice with')]";

    // Dynamic Module Card Title Selector
    static getModuleHeading(moduleName) {
        return `(//h1[normalize-space()='${moduleName}'] | //div[.//h1[normalize-space()='${moduleName}']]//p)[1]`;
    }

    static getModuleCard(moduleName) {
        return `(//div[.//h1[normalize-space()='${moduleName}']])[last()]`;
    }
}

module.exports = DashboardPageLocator;