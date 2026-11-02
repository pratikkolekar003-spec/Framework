@PlaywrightDocs
Feature: Playwright Documentation Verification
  As a tester
  I want to verify the Playwright official documentation website
  So that I can ensure the documentation is accessible and accurate

  @C41
  Scenario: Verify Playwright official documentation website page title
    Given the user navigates to "https://playwright.dev/"
    Then the page title should contain "Playwright"

  @C42
  Scenario: Verify 'Get started' link redirects to Installation documentation
    Given the user navigates to "https://playwright.dev/"
    When the user clicks on the "Get started" link
    Then the heading "Installation" should be visible
