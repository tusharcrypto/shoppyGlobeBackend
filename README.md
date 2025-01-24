# Shopping Cart API with MongoDB Integration, JWT Authentication, and Error Handling

This repository contains a RESTful API built with Node.js, Express, and MongoDB. It supports user authentication, product management, and shopping cart operations.

## Features

### Products API

- **GET /products**: Fetch a list of all products from the database.
- **GET /products/****:id**: Fetch details of a single product by its ID.
- **POST /products**: Add a new product to the database.
- **PUT /products/****:id**: Update product details.
- **DELETE /products/****:id**: Remove a product from the database.

### Cart API

- **POST /cart**: Add a product to the shopping cart.
- **PUT /cart/****:id**: Update the quantity of a product in the cart.
- **DELETE /cart/****:id**: Remove a product from the cart.

### Authentication & Authorization

- **POST /register**: Register a new user.
- **POST /login**: Authenticate a user and return a JWT token.
- Protected Routes: Cart routes are secured with JWT authentication.

### MongoDB Integration

- **Products Collection**: Stores product data with fields such as `name`, `price`, `description`, and `stock_quantity`.
- **Cart Collection**: Stores cart items with fields for `product_id` and `quantity`.

### Error Handling and Validation

- Comprehensive error handling for all API routes.
- Input validation to ensure data integrity, such as verifying product existence before adding to the cart.

---

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- MongoDB (local or cloud-based like MongoDB Atlas)
- npm or yarn package manager

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/tusharcrypto/shoppyGlobeBackend.git
   cd <your-repo-name>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file and add the following:

   ```env
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   PORT=3000
   ```

4. Start the server:

   ```bash
   npm start
   ```

---

## API Endpoints

### Authentication

- **POST /register**: Register a user with `username` and `password`.
- **POST /login**: Authenticate a user and get a JWT token.

### Products

- **GET /products**: Retrieve all products.
- **GET /products/****:id**: Retrieve a product by ID.
- **POST /products**: Add a new product.
- **PUT /products/****:id**: Update an existing product.
- **DELETE /products/****:id**: Delete a product.

### Cart

- **POST /cart**: Add a product to the cart.
- **PUT /cart/****:id**: Update the quantity of a product in the cart.
- **DELETE /cart/****:id**: Remove a product from the cart.

### Protected Routes

Include the JWT token in the `Authorization` header as follows:

```
Authorization: Bearer <token>
```

---

## Database Schema

### Products Collection

```json
{
  "_id": "ObjectId",
  "name": "String",
  "price": "Number",
  "description": "String",
  "stock_quantity": "Number"
}
```

### Cart Collection

```json
{
  "_id": "ObjectId",
  "product_id": "ObjectId",
  "quantity": "Number"
}
```

---



