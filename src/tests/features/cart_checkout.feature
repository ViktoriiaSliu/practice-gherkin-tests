@addCheckout
Feature: Checkout with items in the cart

  @addCart @smoke
  Scenario Outline: Successfully Add Product to Cart with different quantities
    Given I am on the "<productName>" product details page
    When I set the amount to "<quantity>"
    And I add the product to the cart
    Then I should see a success message with text "<successMessages>"
    And the basket icon should show the amount "<quantity>"

    Examples:
      | productName  | quantity | successMessages                |
      | Bolt Cutters |        2 | product added to shopping cart |

  @checkout @regression
  Scenario Outline: Proceed to Checkout with a Product in the Cart
    Given I add a "<productName>" to the cart
    When I go to the cart page
    Then I should see "<productName>" in the cart
    When I log in with valid credentials "<email>" and "<password>"
    And I enter valid billing details
    And I enter valid payment details
    Then I should see a successful order message containing "<successMessage>"

    Examples:
      | productName  | shippingUser | paymentMethod | successMessage         | email                  | password            |
      | Bolt Cutters | testUser1    | credit card   | Payment was successful | testuser86@example.com | Strong#Password#123 |
