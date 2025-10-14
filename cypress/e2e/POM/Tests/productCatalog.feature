Feature: Product Catalog Browsing

    Scenario Outline: View all products after login
        Given I am logged in as
            | username      | password     |
            | standard_user | secret_sauce |
        When I am on the products page
        And I should see 6 products displayed
        Then Each products should have a name, description, and price

    Scenario Outline: Sort products by name (A to Z)
        Given I am logged in as
            | username      | password     |
            | standard_user | secret_sauce |
        When I select the sort option "Name (A to Z)" from the dropdown
        Then The products should be sorted alphabetically by name ascending

    Scenario Outline: Sort products by name (Z to A)
        Given I am logged in as
            | username      | password     |
            | standard_user | secret_sauce |
        When I select the sort option "Name (Z to A)" from the dropdown
        Then The products should be sorted alphabetically by name descending