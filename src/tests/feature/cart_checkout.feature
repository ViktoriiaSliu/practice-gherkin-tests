Feature: Cart and Checkout

  Scenario: Add Product to Cart
    Given I am on the product details page for "Cordless Drill 24V"
    When I select the quantity as "2"
    And I click on the "Add to cart" button
    Then a success message should appear indicating the product has been added
    And the basket icon in the header should display "2" items

  Scenario: Proceed to checkout with items in the cart
    Given I am on the "Cart" page
    And I have "Bolt Cutters" in my shopping cart
    When I click the "Proceed to Checkout" button
    Then I should see that I am already logged in
    When I click the "Proceed to Checkout" button again
    Then I should be redirected to the "Billing Address" page
    When I enter all required billing information and click the "Proceed to Checkout" button
    Then I should be redirected to the "Payment" page
    When I choose a payment method and enter valid payment information
    And I click the "Confirm" button
    Then I should see a message "Payment was successful" on the checkout page