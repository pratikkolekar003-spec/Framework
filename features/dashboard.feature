@Dashboard @Regression
Feature: Dashboard Functionality and Navigation
  As an authenticated user
  I want to access the application dashboard
  So that I can view available practice modules, navigate the application, and logout securely

  Background:
    Given the user launches the application
    And the user logs in with valid username "sagesyntaxacademy" and password "BuildingExcellence@111" credentials

  @C5347 @Smoke
  Scenario: Verify successful redirection to dashboard after login
    Then the user should be on the dashboard page
    And the login success notification should be visible

  @C5348
  Scenario Outline: Verify key practice modules are displayed on dashboard
    Then the practice module "<moduleName>" should be visible on the dashboard

    Examples:
      | moduleName       |
      | Basic Elements   |
      | Forms            |
      | Alerts & Frames  |
      | Widgets          |
      | User Interactions|
      | Web Tables       |
      | File Handling    |
      | Authentication   |
      | API Testing      |
      | Broken Links     |

  @C5349
  Scenario: Verify user can logout from the dashboard
    When the user clicks on the logout button
    Then the user should be redirected to the login page