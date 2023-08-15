const authController = require("../controllers/auth.controller");
const authFunction = require("../middlewares/auth.middleware");
module.exports = function (app) {
  app.post("/users", authController.signup);
};
