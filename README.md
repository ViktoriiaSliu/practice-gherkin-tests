# Practice Software Testing – Gherkin Scenarios

This project contains Gherkin feature scenarios written for the [Practice Software Testing](https://practicesoftwaretesting.com/) demo web application. The goal is to demonstrate BDD-style test design using Gherkin syntax.

## 📋 What's Included

- **8 Gherkin scenarios** across major functional areas:
  - User Sign Up & Sign In
  - Product Search
  - Product Filtering & Sorting
  - Category Navigation
  - Product Details Page
  - Add to Basket & Checkout
 
- Mocha and chai implementation
- POM refactoring

## 📁 File Structure

project-root/
│
├── test/
│   ├── feature/     
│   │   ├── cart_checkout.feature
│   │   ├── filter_sort.feature
│   │   ├── product_search.feature
│   │   └── signUp_In.feature
│   │
│   ├── pageobjects/     
│   │   ├── base_page.js
│   │   ├── register_page.js
│   │   ├── login_page.js
│   │   ├── product_detail_page.js
│   │   ├── product_listing_page.js
│   │   └── cart_page.js
│   │
│   ├── specs/             
│   │   ├── register_spec.js
│   │   ├── login_spec.js
│   │   ├── filter_product_spec.js
│   │   ├── sort_product_spec.js
│   │   ├── view_details_productspec.js
│   │   ├── search_product_spec.js
│   │   ├── add_to_cart_spec.js
│   │   └── checkout_spec.js
│   │
│   ├── data/           
│   │   └── test_date.js
├── wdio.conf.js         
├── package.json
└── README.md
