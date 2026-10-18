@AddToCart @Regression
Feature: Add to Cart and Shopping Cart Functionality
  As a registered user
  I want to browse products, add items to my cart, and manage my cart
  So that I can purchase desired products

  Background:
    Given the user launches the application
    And the user logs in with valid username "sagesyntaxacademy" and password "BuildingExcellence@111" credentials
    And the user navigates to the products page

  @C6001 @Smoke
  Scenario: Verify user can add an available product to the cart
    When the user adds product "iPhone" to the cart
    Then the user should see the success notification "Item added successfully🤗 !"
    When the user navigates to the cart page
    Then the cart badge count should be 1
    And the product "iPhone" should be displayed in the cart

  @C6002
  Scenario Outline: Verify user can add different available products to the cart
    When the user adds product "<productName>" to the cart
    Then the user should see the success notification "Item added successfully🤗 !"
    And the user navigates to the cart page
    Then the product "<productName>" should be displayed in the cart

    Examples:
      | productName |
      | iPhone      |
      | Camera      |
      | Purse       |
      | Watch       |
      | Mouse       |

  @C6003
  Scenario: Verify user can add multiple different products to the cart
    When the user adds product "iPhone" to the cart
    And the user closes the toast notification
    And the user adds product "Camera" to the cart
    Then the user should see the success notification "Item added successfully🤗 !"
    And the user navigates to the cart page
    Then the product "iPhone" should be displayed in the cart
    And the product "Camera" should be displayed in the cart

  @C6004
  Scenario: Verify user can increase product quantity before adding to cart
    When the user increases the quantity for product "Purse" by 2
    And the user adds product "Purse" to the cart
    Then the user should see the success notification "Item added successfully🤗 !"
    And the user navigates to the cart page
    Then the product "Purse" should have quantity 3 in the cart

  @C6005
  Scenario Outline: Verify out of stock products cannot be added to the cart
    When the user adds product "<outOfStockProduct>" to the cart
    Then the user should see the out of stock notification "This item is currently unavailable☹️ !"

    Examples:
      | outOfStockProduct |
      | Keyboard          |
      | Samsung           |
      | Laptop            |

  @C6006
  Scenario: Verify user can remove an item from the cart
    When the user adds product "Watch" to the cart
    And the user navigates to the cart page
    Then the product "Watch" should be displayed in the cart
    When the user removes the product "Watch" from the cart
    Then the product "Watch" should not be present in the cart

  @C6007
  Scenario: Verify empty cart message and browse navigation
    When the user navigates to the cart page
    Then the user should see the empty cart message "Your cart is Empty"
    When the user clicks the browse button
    Then the user should be on the products page
