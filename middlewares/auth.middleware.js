const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const configs = require("../configs/auth.config");

verifyToken = (req, res, next) => {
  let token = req.headers["x-auth-token"];

  if (!token) {
    return res.status(403).send({
      message: "Please login first to access this endpoint!",
    });
  }

  jwt.verify(token, configs.secret, (err, payload) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized",
      });
    }

    req.userId = payload.email;
    next();
  });
};

verifyAdmin = async (req, res, next) => {
  const user = await userModel.findOne({ email: req.userId });
  if (user.role !== "ADMIN") {
    return res
      .status(401)
      .json("You are not authorised to access this endpoint!");
  }

  next();
};

verifyUser = async (req, res, next) => {
  const user = await userModel.findOne({ email: req.userId });
  if (user.role !== "USER") {
    return res
      .status(401)
      .json("You are not authorised to access this endpoint!");
  }

  next();
};

const authFunction = {
  verifyToken: verifyToken,
  verifyAdmin: verifyAdmin,
  verifyUser: verifyUser,
};

module.exports = authFunction;
