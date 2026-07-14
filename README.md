# Parfum E-Commerce

A compact full-stack perfume e-commerce prototype built with React, Express, and SQLite. It covers the main storefront journey—from browsing products and managing a cart to a demo checkout—and includes administrator screens for catalogue maintenance.

This repository is the leaner UI iteration of the perfume-store project and is useful for demonstrating client/server integration, CRUD operations, local persistence, and role-aware navigation.

## Features

- Responsive storefront and product catalogue
- Product data loaded from an Express API
- Customer registration and login screens
- Persistent localStorage shopping cart
- Stock-aware quantity controls
- Demo shipping/payment checkout flow
- Administrator login and protected admin routes
- Create, edit, list, and delete product screens
- SQLite-backed users and products
- Vite development proxy and Express production static hosting

## Stack

| Layer | Technology |
| --- | --- |
| Frontend | React 19, Vite, React Router 7 |
| Backend | Node.js, Express 5 |
| Database | SQLite 3 |
| Styling | Application CSS and responsive components |

## Repository structure

```text
parfum-e-co/
├── client/
│   ├── src/components/       # Navigation and route guards
│   ├── src/context/          # Cart state and local persistence
│   ├── src/pages/            # Store, auth, checkout, and admin pages
│   └── vite.config.js        # Development API proxy
└── server/
    ├── routes/auth.js        # Registration and login
    ├── routes/products.js    # Product CRUD
    ├── initDb.js             # Schema and demo data
    ├── db.js                 # SQLite connection
    └── index.js              # Express server
```

## Installation

### Requirements

- Node.js 18 or newer
- npm

### Backend

```bash
git clone https://github.com/stardust07a/parfum-e-co.git
cd parfum-e-co/server
npm install
npm run initdb
node migrateRole.js
node migrateProductImage.js
npm run dev
```

The API starts on `http://localhost:5000`.

The migration scripts add the role and product-image columns expected by the current API. Re-running them only reports that the columns already exist.

### Frontend

In another terminal:

```bash
cd parfum-e-co/client
npm install
npm run dev
```

The frontend normally opens at `http://localhost:5173`; `/api` is proxied to port 5000.

## API overview

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Register a customer |
| `POST` | `/api/auth/login` | Authenticate a user and return role information |
| `GET` | `/api/products` | List products |
| `GET` | `/api/products/:id` | Read a product |
| `POST` | `/api/products` | Add a product |
| `PUT` | `/api/products/:id` | Edit a product |
| `DELETE` | `/api/products/:id` | Remove a product |

## Data and UI behavior

The SQLite product model stores name, brand, category, price, stock, image, and creation date. Cart state is stored in the browser, including quantity and subtotal calculations. The checkout adds shipping and clears the cart after the demo completion action; it does not create a persisted order.

## Current limitations

- Password handling is prototype-level and currently compares plain-text values in SQLite.
- The development admin credentials must not be reused in a real deployment.
- Client-side role guards do not replace server-side authorization; product write routes need authentication middleware.
- Checkout does not connect to a payment provider or order-management system.
- The admin product list currently contains a malformed API path with a leading space and should be corrected before relying on that screen.
- The current navigation component produces a duplicate `className` build warning; the production build still completes.
- Images are passed in application payloads rather than stored in an object store.
- SQLite, validation, error handling, and test coverage need production hardening.

## Suggested next steps

- Implement bcrypt password hashing and secure sessions
- Add server-side admin authorization to product mutations
- Fix and centralize API calls in a shared client service
- Add order and order-item tables
- Connect image upload storage and a real payment sandbox
- Add API tests, React component tests, and CI

## Author

Built by **Aziz** as a full-stack e-commerce learning project.
