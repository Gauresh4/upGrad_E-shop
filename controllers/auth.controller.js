const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  const hashedPass = bcrypt.hashSync(req.body.password, 10);
  const userObj = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    email: req.body.email,
    password: hashedPass,
    phoneNumber: req.body.phoneNumber,
    role: req.body.role,
  };
  try {
    const userCreated = await User.create(userObj);
    const postResponse = {
      firstName: userCreated.firstName,
      lastName: userCreated.lastName,
      userName: userCreated.userName,
      email: userCreated.email,
      phoneNumber: userCreated.phoneNumber,
      role: userCreated.role,
      createdAt: userCreated.createdAt,
      updatedAt: userCreated.updatedAt,
    };
    res.status(201).send(postResponse);
  } catch (err) {
    console.log(`Error while inserting user ${err}`);
    res.status(500).send({
      message: "Some internal error while registration",
    });
  }
};
