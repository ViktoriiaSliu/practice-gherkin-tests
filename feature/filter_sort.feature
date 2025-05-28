Feature: Product Filter and Sort

    Scenario: Filter Products by Category
    Given I am on the product listing page
    When I go to the filter "By category:"
    And I select the "Power Tools" category
    Then only products belonging to the "Power Tools" category should be displayed on the page

  Scenario: Sort Products by Price: Low to High
    Given I am on the product listing page
    When I click on the "Sort By" dropdown
    And I select "Price (Low - High)"
    Then the product list should be sorted in ascending order by price