Feature: User Sign Up and Sign In

  Scenario: Successful User Sign Up
    Given I am on the Sign Up page
    When I enter valid registration details
    And I click on the "Create Account" button
    Then I should see a message "Account created successfully"

  Scenario: Successful User Sign In
    Given I am on the Sign In page
    When I enter a valid email and password
    And I click the "Sign In" button
    Then I should be redirected to my account dashboard