const categoryMiddlewareRoute = require("../../middlewares/client/category.middleware");
const cartMiddlewareRoute = require("../../middlewares/client/cart.middleware");
const userMiddlewareRoute = require("../../middlewares/client/user.middleware");
const settingMiddlewareRoute = require("../../middlewares/client/setting.middleware");
const chatMiddlewareRoute = require("../../middlewares/client/chat.middleware");

const productRoute = require("./product.route");
const homeRoute = require("./home.route");
const searchRoute = require("./search.route");
const cartRoute = require("./cart.route");
const checkoutRoute = require("./checkout.route");
const userRoute = require("./user.route");
const chatRoute = require("./chat.route");

module.exports = (app) => {
  app.use(categoryMiddlewareRoute.category);
  app.use(cartMiddlewareRoute.cartId);
  app.use(userMiddlewareRoute.infoUser);
  app.use(settingMiddlewareRoute.settingGeneral);
  app.use(chatMiddlewareRoute.isAccess);

  app.use("/", homeRoute);

  app.use("/search", searchRoute);

  app.use("/products", productRoute);

  app.use("/cart", cartRoute);

  app.use("/checkout", checkoutRoute);
  
  app.use("/user", userRoute);

  app.use("/chat", chatRoute);
};
