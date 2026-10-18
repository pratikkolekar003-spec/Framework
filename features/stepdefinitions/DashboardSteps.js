const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

/**
 * ============================================================
 *                 DASHBOARD FEATURE STEPS
 * ============================================================
 */

Then("the user should be on the dashboard page", async function () {
    await this.testContext.pageManager
        .getDashboardPage()
        .verifyDashboardUrl();
});

Then("the login success notification should be visible", async function () {
    await this.testContext.pageManager
        .getDashboardPage()
        .verifyLoginSuccessPopup();
});

Then("the practice module {string} should be visible on the dashboard", async function (moduleName) {
    await this.testContext.pageManager
        .getDashboardPage()
        .verifyModuleCardVisible(moduleName);
});

When("the user clicks on the logout button", async function () {
    await this.testContext.pageManager
        .getDashboardPage()
        .clickLogout();
});

Then("the user should be redirected to the login page", async function () {
    await this.testContext.pageManager
        .getDashboardPage()
        .verifyOnLoginPage();
});
