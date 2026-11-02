const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Given("the user navigates to {string}", async function (url) {
    await this.testContext.page.goto(url);
});

Then("the page title should contain {string}", async function (expectedTitle) {
    await expect(this.testContext.page).toHaveTitle(new RegExp(expectedTitle));
});

When("the user clicks on the {string} link", async function (linkName) {
    await this.testContext.page.getByRole("link", { name: linkName }).click();
});

Then("the heading {string} should be visible", async function (headingName) {
    await expect(this.testContext.page.getByRole("heading", { name: headingName })).toBeVisible();
});
