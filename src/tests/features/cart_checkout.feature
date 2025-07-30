@addCheckout
Feature: Checkout with items in the cart

  Background:
    Given I have a registered user
    And I am on the login page

  @addCart @smoke
  Scenario: Successfully Add Bolt Cutters to Cart
    Given I am on the Bolt Cutters product details page
    When I set the quantity of product
    And I add the product to the cart
    Then I should see a success message indicating product were added
    And the basket icon should show the quantity of product

  @checkout @regression
  Scenario: Proceed to Checkout with Items in Cart
    Given I add product to the cart
    When I go to the cart page
    Then I should see product in the cart
    When I login with valid credentials
    And I enter valid billing details
    And I enter valid payment details
    Then I should see a successful payment message
