const Order = require("../models/order.model");
const User = require("../models/user.model");
const Product = require("../models/product.model");
const ShippingAddress = require("../models/shippingAddress.model");

exports.createOrder = async (req, res) => {
  const { productId, addressId, quantity } = req.body;
  const user = await User.findOne({ email: req.userId }).select("-password");
  const product = await Product.findById(req.body.productId);
  const address = await ShippingAddress.findOne({ "user._id": user._id });

  if (!product)
    return res
      .status(400)
      .json(`No product fround for id - ${req.body.productId}`);
  if (product.availableItems < 1)
    return res
      .status(400)
      .json(
        `Product with ID - ${req.body.productId} is currently out of stock!`
      );
  try {
    const order = await Order.create({
      productId: product._id,
      addressId: address._id,
      quantity,
    });
    return res.status(200).send({
      id: order._id,
      user: user,
      product: product,
      shippingAddress: address,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal Error",
    });
  }
};
