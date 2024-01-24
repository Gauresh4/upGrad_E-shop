const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config");

exports.signup = async (req, res) => {
  const hashedPass = bcrypt.hashSync(req.body.password, 10);

  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    return res.status(403).json({
      message: "Try any other email, this email is already registered!",
    });
  }

  if (req.body.contactNumber.toString().length != 10) {
    return res.status(403).json({
      message: "Invalid contact number!",
    });
  }

  const emailRequirement = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-z]{2,6}$/;
  if (!emailRequirement.test(req.body.email)) {
    return res.status(400).json({ message: "Invalid email-id format!" });
  }

  if (!/^[a-zA-Z0-9._-]+$/.test(req.body.email.split("@")[0])) {
    return res.status(400).json({ message: "Invalid email-id format!" });
  }
  const userObj = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    email: req.body.email,
    password: hashedPass,
    contactNumber: req.body.contactNumber,
    role: req.body.role,
  };
  try {
    const userCreated = await User.create(userObj);
    const postResponse = {
      _id: userCreated._id,
      firstName: userCreated.firstName,
      lastName: userCreated.lastName,
      email: userCreated.email,
      //   userName: userCreated.userName,
      //   contactNumber: userCreated.contactNumber,
      //   role: userCreated.role,
      //   createdAt: userCreated.createdAt,
      //   updatedAt: userCreated.updatedAt,
    };
    res.status(200).send(postResponse);
  } catch (err) {
    console.log(`Error while inserting user ${err}`);
    res.status(500).send({
      message: "Some internal error while registration",
    });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  const isUserExists = await User.findOne({ email });

  if (!isUserExists) {
    return res.status(403).json({
      message: "This email has not been registered!",
    });
  }

  const isValidPassword = bcrypt.compareSync(password, isUserExists.password);
  if (!isValidPassword) {
    return res.status(403).json({
      message: "'Invalid Credentials!",
    });
  }

  const token = jwt.sign({ email }, authConfig.secret, {
    expiresIn: 2000,
  });

  var responseUser = {
    name: isUserExists.firstName + " " + isUserExists.lastName,
    email: isUserExists.email,
    token: token,
    isAuthenticated: true,
  };

  res.status(200).send(responseUser);
};
