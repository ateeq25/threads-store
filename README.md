THREADS — Fashion E-commerce Website

THREADS is a frontend fashion e-commerce website built to simulate an online shopping experience. It features a curated product collection, product filtering and sorting, individual product pages, a functional shopping cart, and a complete checkout flow.

The project was built to practise frontend development, JavaScript functionality, modular code organisation, and responsive web design.

Live Demo

Visit the website:
(https://ateeq25.github.io/threads-store/)

Features
- Homepage: A responsive landing page featuring promotional content, featured products, product categories, brand information, and a newsletter section.
- Product Listing: Browse products by category, filter collections, and sort by price.
- Product Details: View product images, descriptions, available sizes, and prices. Select sizes and quantities before adding products to the cart.
- Shopping Cart: Add products, update quantities, remove items, and view calculated subtotals.
- Checkout: Enter customer and delivery information, with form validation and an order summary.
- Order Confirmation: Generate a unique order reference and display order details after successful checkout.
- Persistent Storage: Use browser localStorage to retain cart items and order information across page refreshes.
- Responsive Design: Adapt the shopping experience to desktop, tablet, and mobile screens.

Technologies Used
- HTML5
- CSS3
- JavaScript (ES6+)
- Webpack
- JSON
- localStorage

Project Structure
threads-store/
├── src/
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── videos/
│   ├── data/
│   │   └── products.json
│   ├── js/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── index.js
│   ├── styles/
│   └── index.html
├── dist/
├── package.json
├── webpack.config.js
└── .gitignore

Project Limitations
THREADS is a frontend-only demonstration project.
- Product information is provided through local JSON data.
- Cart and order information are stored in the browser using localStorage.
- Checkout simulates order placement; no actual payment is processed.
- There is no backend, user authentication, or live inventory management.

Future Improvements
Potential improvements include:
- Backend integration and database management.
- User authentication and account management.
- Real payment gateway integration.
- Order tracking and management.
- Product search and advanced filtering.

Author
Ateeq Oyeleke
[GitHub](https://github.com/ateeq25)
