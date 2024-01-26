// const express = require("express");
// const orderController = require("../controllers/order.controller");
// const authjwt = require("../middlewares/auth.middleware");
// const { placeOrder } = require("../controllers/order.controller");

// module.exports = function (app) {
//   app.post("/orders", authjwt.verifyToken, authjwt.verifyUser, placeOrder);
// };

const { authMiddleware } = require("../middlewares");
const orderController = require("../controllers/order.controller");

module.exports = function (app) {
  app.post(
    "/orders",
    authMiddleware.verifyToken,
    authMiddleware.verifyUser,
    orderController.createOrder
  );
};
