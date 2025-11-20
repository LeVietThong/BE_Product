const categoryMiddlewareRoute = require("../../middlewares/client/category.middleware");
const cartMiddlewareRoute = require("../../middlewares/client/cart.middleware");
const userMiddlewareRoute = require("../../middlewares/client/user.middleware");

const productRoute = require("./product.route");
const homeRoute = require("./home.route");
const searchRoute = require("./search.route");
const cartRoute = require("./cart.route");
const checkoutRoute = require("./checkout.route");
const userRoute = require("./user.route");

module.exports = (app) => {
  app.use(categoryMiddlewareRoute.category);
  app.use(cartMiddlewareRoute.cartId);
  app.use(userMiddlewareRoute.infoUser);

  app.use("/", homeRoute);

  app.use("/search", searchRoute);

  app.use("/products", productRoute);

  app.use("/cart", cartRoute);

  app.use("/checkout", checkoutRoute);
  
  app.use("/user", userRoute);
};
