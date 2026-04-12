README_CICD.md

-------------------------------------
Project Overview
-------------------------------------
Frontend Specialization 02 Module Project

CURRENT PROJECT GOAL:
Implement a streamlined Continuous Integration 
and Continuous Deployment (CI/CD) pipeline. 
To ensure the project is robust, TDD should be 
included to showcase components working successfully. 
This pipeline should automate the process of building, 
testing, and deploying the application to Vercel, 
a cloud platform. Key components include setting up 
a robust CI/CD workflow using GitHub Actions and 
implementing unit tests for application reliability.

EXTENDED PROJECT GOAL:
Extend eCommerce app (see ORIGINAL Goal below) 
by integrating Firebase for product management
and user orders. FakeStore API is replaced with
Firestore for managing products and Firebase is 
implemented to store and manage user orders.

ORIGINAL Goal: 
Create an 'Advanced' React E-Commerce web App 
utilizing React Query to fetch products from
a fake store API and Redux Toolkit to manage 
the shopping cart state.


-------------------------------------
Project Installations
-------------------------------------
Creation: vite@latest

Installs:
- axios
- react-dom
- react-router-dom
- @tanstack/react-query
- redux react-redux @reduxjs/toolkit
- firebase
- jest @testing-library/react @testing-library/jest-dom
- jest-environment-jsdom
- @babel/preset-env @babel/preset-react
- ts-jest
- @types/jest
- fast-text-encoding
- vercel

Installations (specifics):
├── @babel/preset-env@7.29.0
├── @babel/preset-react@7.28.5
├── @eslint/js@9.39.3
├── @jest/globals@30.3.0
├── @reduxjs/toolkit@2.11.2
├── @tanstack/react-query@5.90.21
├── @testing-library/jest-dom@6.9.1
├── @testing-library/react@16.3.2
├── @testing-library/user-event@14.6.1
├── @types/jest@30.0.0
├── @types/node@24.12.0
├── @types/react-dom@19.2.3
├── @types/react-router-dom@5.3.3
├── @types/react@19.2.14
├── @vitejs/plugin-react@5.1.4
├── axios@1.13.6
├── eslint-plugin-react-hooks@7.0.1
├── eslint-plugin-react-refresh@0.4.26
├── eslint@9.39.3
├── fast-text-encoding@1.0.6
├── firebase@12.10.0
├── globals@16.5.0
├── jest-environment-jsdom@30.3.0
├── jest@30.3.0
├── react-dom@19.2.4
├── react-redux@9.2.0
├── react-router-dom@7.13.1
├── react@19.2.4
├── redux@5.0.1
├── ts-jest@29.4.6
├── ts-node@10.9.2
├── typescript-eslint@8.56.0
├── typescript@5.9.3
├── util@0.12.5
└── vite@7.3.1

-------------------------------------
Project Architecture
-------------------------------------
.github
|
|_workflows
    |_main.yml

src
|
|_ __tests__
|   |_CartUpdate.test.tsx
|   |_Login.test.tsx
|   |_Register.test.tsx
|
|
|_ components
|   |_CategoryNav.tsx
|   |_Login.tsx
|   |_Logout.tsx
|   |_OrderDetails.tsx
|   |_OrderHistory.tsx
|   |_ProductManagement.tsx
|   |_Products.tsx
|   |_ProtectedRoute.tsx
|   |_Register.tsx
|   |_ShoppingCart.tsx
|   |_UserManagement.tsx
|
|
|_ pages
|   |_Home.tsx
|
|
|_redux
|   |_authSlice.ts
|   |_cartSlice.ts
|   |_selectors.ts
|   |_store.ts
|
|
scripts
|   |_importProducts.ts
|
|
|_ types
|   |_types.ts
|
|
|_App.txs
|
|
|_firebase.Config.ts


-------------------------------------
Project Useage 
-------------------------------------

Current Project Useage:
The e-commerce project requires a streamlined Continuous Integration and Continuous Deployment (CI/CD) pipeline for optimal performance. To ensure the project is robust, TDD should be included to showcase your components working successfully. This pipeline should automate the process of building, testing, and deploying the application to Vercel, a cloud platform. Key components include setting up a robust CI/CD workflow using GitHub Actions and implementing unit tests for application reliability. 

Previous Project Useage:
A homepage displays all products fetched from the ake store API, a dropdown to choose a product category which displays just that category of products, and a navbar allowing access to the shopping cart and Home pages. Users are able to add a product to thier cart directly from the Home page and when viewing the shopping cart, the total number of items and the total price are displayed. When the user 'checks out' the cart is cleared and they receive a notice that thier checkout is successful and the cart has been cleared.

Original Project Useage:
A homepage displays all products fetched from the 
ake store API, a dropdown to choose a product category 
which displays just that category of products, and a
navbar allowing access to the shopping cart and Home 
pages. Users are able to add a product to thier cart
directly from the Home page and when viewing the 
shopping cart, the total number of items and the 
total price are displayed. When the user 'checks out'
the cart is cleared and they receive a notice that 
thier checkout is successful and the cart has been
cleared.