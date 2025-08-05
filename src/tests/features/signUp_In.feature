@auth
Feature: User Sign Up and Login In

  @registration @regression
  Scenario Outline: Successful User Sign Up with Valid Details
    Given I am on the registration page
    When I register a new user with alias "<userTest>"
    Then I should see the login header
    And I should see the login button

    Examples:
      | userTest  |
      | testUser1 |

  @login @smoke
  Scenario Outline: User can log in with valid credentials
    Given I am on the Login page
    When I log in with valid credentials "<email>" 
    And I enter valid  "<password>"
    And I click the login button
    Then I should be redirected to the account page
    And I should see the "My account" header

    Examples:
      | email                  | password            |
      | testuser86@example.com | Strong#Password#123 |
