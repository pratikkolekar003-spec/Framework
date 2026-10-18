const BasePage = require("./BasePage");
const DashboardPageLocator = require("../locators/DashboardPageLocator");
const logger = require("../utils/Logger");
const { expect } = require("@playwright/test");

class DashboardPage extends BasePage {
    constructor(page) {
        super(page);
    }

    /**
     * Waits for login popup notification (maintained for backwards compatibility)
     */
    async capturePopupMessage() {
        logger.info("Waiting for dashboard popup message");
        await this.waitForVisible(DashboardPageLocator.loginSuccessPopup);
    }

    /**
     * Reads text of the login success popup
     * @returns {Promise<string>}
     */
    async getPopupMessage() {
        logger.info("Reading dashboard popup message");
        await this.waitForVisible(DashboardPageLocator.loginSuccessPopup);
        return await this.getText(DashboardPageLocator.loginSuccessPopup);
    }

    /**
     * Verifies that the login success popup is visible
     */
    async verifyLoginSuccessPopup() {
        logger.info("Verifying login success popup is visible");
        await this.waitForVisible(DashboardPageLocator.loginSuccessPopup);
        await expect(this.locator(DashboardPageLocator.loginSuccessPopup)).toBeVisible();
    }

    /**
     * Returns the title of the current page
     * @returns {Promise<string>}
     */
    async capturePageTitle() {
        return await this.getTitle();
    }

    /**
     * Verifies user has landed on dashboard / home URL
     */
    async verifyDashboardUrl() {
        logger.info("Verifying user is on Dashboard / Home URL");
        await expect(this.page).toHaveURL(/.*\/home(\/|\?.*)?$/);
    }

    /**
     * Verifies a specific practice module is visible on the dashboard
     * @param {string} moduleName
     */
    async verifyModuleCardVisible(moduleName) {
        logger.info(`Verifying practice module '${moduleName}' is visible on dashboard`);
        const headingLocator = DashboardPageLocator.getModuleHeading(moduleName);
        await this.scrollIntoView(headingLocator);
        await expect(this.locator(headingLocator)).toBeVisible();
    }

    /**
     * Clicks the Logout button from dashboard header
     */
    async clickLogout() {
        logger.info("Clicking Logout button");
        await this.click(DashboardPageLocator.logoutButton);
        await this.page.waitForLoadState("networkidle");
    }

    /**
     * Verifies that user is redirected back to the Login page after logout
     */
    async verifyOnLoginPage() {
        logger.info("Verifying user is redirected to Login page");
        await expect(this.page).toHaveURL(/.*(\/login\/?|\/$)/);
        await expect(this.locator("#username")).toBeVisible();
    }
}

module.exports = DashboardPage;