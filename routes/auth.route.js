const { signup, signin } = require("../controllers/auth.controller");
module.exports = function (app) {
  app.post("/users", signup);
  app.post("/auth", signin);
};
