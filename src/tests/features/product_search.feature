@prodSearch
Feature: Product Search and Details

@search @smoke
  Scenario: Search for an Existing Product
    Given I am on the homepage
    When I enter the testing product name in the search bar
    And I click the search icon
    Then I should see all the testing product name in the results

@view @smoke
  Scenario: View Details for Bolt Cutters
    Given I am on the product listing page
    When I select the testing product
    Then I should see the testing product title
    And I should see a description for the testing product
    And I should see the price for the testing product
    And I should see the image for the testing product
