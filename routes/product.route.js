const express = require("express");
const productController = require("../controllers/product.controller");
const authjwt = require("../middlewares/auth.middleware");
const {
  saveProduct,
  searchProducts,
  getProductCategories,
} = require("../controllers/product.controller");

module.exports = function (app) {
  //Save Product - '/products'
  app.post("/products", authjwt.verifyToken, authjwt.verifyAdmin, saveProduct);
  // Search Product - '/products'
  app.get("/products", searchProducts);
  // Get Product Categories - '/products/categories'
  app.get("/products/categories", getProductCategories);
};
