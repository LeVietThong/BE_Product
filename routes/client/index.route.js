const categoryMiddlewareRoute = require("../../middlewares/client/category.middleware");

const productRoute = require("./product.route");
const homeRoute = require("./home.route");
const searchRoute = require("./search.route");

module.exports = (app) => {
  app.use(categoryMiddlewareRoute.category);

  app.use("/", homeRoute);

  app.use("/search", searchRoute);

  app.use("/products", productRoute);
};
