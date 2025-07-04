Feature: Product Search and Details

  Scenario: Search for an Existing Product
    Given I am on the homepage
    When I enter "Hammer" in the search bar
    And I click the search icon
    Then I should see all the "Hammer" in the results

  Scenario: View Product Details
    Given I am on the product listing page
    When I click on a product name "Bolt Cutters"
    Then I should be taken to the product details page for "Bolt Cutters"
    And I should see the description, price, and image
