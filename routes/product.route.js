const express = require("express");
const productController = require("../controllers/product.controller");
const authjwt = require("../middlewares/auth.middleware");
const {
  saveProduct,
  searchProducts,
  getProductCategories,
  getProductById,
  updateProductById,
  deleteProduct,
} = require("../controllers/product.controller");

module.exports = function (app) {
  // Save Product - '/products'
  app.post("/products", authjwt.verifyToken, authjwt.verifyAdmin, saveProduct);
  // Search Product - '/products'
  app.get("/products", searchProducts);
  // Get Product Categories - '/products/categories'
  app.get("/products/categories", getProductCategories);
  // Get Product by Product ID - '/products/{id}'
  app.get("/products/:id", getProductById);
  // Update Product Details- '/products/{id}'
  app.put(
    "/products/:id",
    authjwt.verifyToken,
    authjwt.verifyAdmin,
    updateProductById
  );
  // Delete Product '/products/{id}'
  app.delete(
    "/products/:id",
    authjwt.verifyToken,
    authjwt.verifyAdmin,
    deleteProduct
  );
};
