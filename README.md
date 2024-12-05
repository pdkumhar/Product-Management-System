# Product-Management-System
# API Documentation

## Add Product (POST)
- **Request URL:** `http://localhost:3000/api/products/`
- **Method:** POST
- **Authorization:** Bearer token (paste your login token in the Bearer field)
- **Headers:**
  - Key: `Content-Type`
  - Value: `application/json`
- **Body:**
  - JSON data for the product.

## Read Product (GET)
- **Request URL:** `http://localhost:3000/api/products`
- **Method:** GET
- **Authorization:** Bearer token

## Update Product (PUT)
- **Request URL:** `http://localhost:3000/api/products/1`
- **Method:** PUT
- **Authorization:** Bearer token
- **Headers:**
  - Key: `Content-Type`
  - Value: `application/json`
- **Body:**
  - JSON data for the updated product.
  - (Note: Replace `1` with the actual product ID)

## Delete Product (DELETE)
- **Request URL:** `http://localhost:3000/api/products/1`
- **Method:** DELETE
- **Authorization:** Bearer token
- **Headers:**
  - Key: `Content-Type`
  - Value: `application/json`
