Feature: User Sign Up and Sign In

  Scenario: Successful User Sign Up
    Given I am on the Sign Up page
    When I enter valid registration details
    And I click on the "Register" button
    Then I should see a Login page form

  Scenario: Successful User Login In
    Given I am on the Login In page
    When I enter a valid email and password
    And I click the "Login" button
    Then I should be redirected to my account dashboard
