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
