Feature: Product Catalog Browsing

    Scenario: View all products after login
        Given I am logged in as
            | username      | password     |
            | standard_user | secret_sauce |
        When I am on the products page
        And I should see 6 products displayed
        Then Each products should have a name, description, and price