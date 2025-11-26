const mongoose = require("mongoose");
const Cart = require("../../models/cart.model");

module.exports.cartId = async (req, res, next) => {
  let cart;

  const expiresCookie = 365 * 24 * 60 * 60 * 1000;

  const cartId = req.cookies.cartId;

  // Nếu chưa có cookie hoặc cookie không hợp lệ
  if (!cartId || !mongoose.Types.ObjectId.isValid(cartId)) {
    cart = new Cart();
    await cart.save();

    res.cookie("cartId", cart.id, {
      expires: new Date(Date.now() + expiresCookie),
    });
  } else {
    // Nếu có cookie hợp lệ thì tìm giỏ hàng
    cart = await Cart.findById(cartId);

    // Nếu không tìm thấy giỏ hàng thì tạo mới
    if (!cart) {
      cart = new Cart();
      await cart.save();

      res.cookie("cartId", cart.id, {
        expires: new Date(Date.now() + expiresCookie),
      });
    }
  }

  // Tính tổng số lượng sản phẩm
  cart.totalQuantity = cart.products.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  res.locals.miniCart = cart;
  next();
};
