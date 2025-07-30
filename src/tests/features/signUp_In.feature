@auth
Feature: User Sign Up and Login In

  Background:
    Given I register a new user if not already registered
    Then I am on the Login In page

  @registration @regression
  Scenario: Successful User Sign Up with Valid Details
    Given I am on the registration page
    When I register a new user with valid details
    Then I should see the login header
    And I should see the login button

  @login @smoke
  Scenario: User can log in with valid credentials
    When I log in with valid credentials
    Then I should be redirected to the account page
    And I should see the "My account" header