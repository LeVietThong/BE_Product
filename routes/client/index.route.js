const categoryMiddlewareRoute = require("../../middlewares/client/category.middleware");

const productRoute = require("./product.route");
const homeRoute = require("./home.route");

module.exports = (app) => {
  app.use(categoryMiddlewareRoute.category);

  app.use("/", homeRoute);

  app.use("/products", productRoute);
};
