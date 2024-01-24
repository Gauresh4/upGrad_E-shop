const shipingAddressController = require("../controllers/shipingAddress.controller");
const { authMiddleware } = require("../middlewares");

module.exports = (app) => {
  app.post(
    "/addresses",
    authMiddleware.verifyToken,
    shipingAddressController.createShippingAddress
  );
};
