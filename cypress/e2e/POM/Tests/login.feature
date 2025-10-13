Feature: User Login and Authentication

    Scenario Outline: Successful login with valid credentials
        Given I am on the login page of Saucedemo
        When I enter username and password
            | username      | password     |
            | standard_user | secret_sauce |
        And I click the login button
        And I should be redirected to the product page
        Then The page title should be "Products"

    Scenario Outline: Failed login with invalid credentials
        Given I am on the login page of Saucedemo
        When I enter username and password
            | username     | password       |
            | invalid_user | wrong_password |
        And I click the login button
        Then I should see an error message "Epic sadface: Username and password do not match any user in this service"

    Scenario: Failed login with empty credentials
        Given I am on the login page of Saucedemo
        When I click the login button without entering credentials
        Then I should see an error message "Epic sadface: Username is required"

    Scenario Outline: Login with locked out user
        Given I am on the login page of Saucedemo
        When I enter username and password
            | username        | password     |
            | locked_out_user | secret_sauce |
        And I click the login button
        Then I should see an error message "Epic sadface: Sorry, this user has been locked out."

    Scenario Outline: Login with problem user (to verify product sorting)
        Given I am on the login page of Saucedemo
        When I enter username and password
            | username     | password     |
            | problem_user | secret_sauce |
        And I click the login button
        And I should be redirected to the product page
        Then Check the page is broken