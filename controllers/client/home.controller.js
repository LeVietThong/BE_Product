const Product = require("../../models/product.model");

const productsHelper = require("../../helpers/products");

// [GET] /
module.exports.index = async (req, res) => {
  //Lấy ra sản phẩm nổi bật
  const productsFeatured = await Product.find({
    featured: "1",
    delete: false,
    status: "active",
  }).limit(5);

  const newProductsFeatured = productsHelper.priceNewProducts(productsFeatured);

  //Lấy ra danh sách sản phẩm mới nhất
  const productsNew = await Product.find({
    status: "active",
    delete: false,
  }).sort({ position: "desc" }).limit(5);

  const newProductsNew = productsHelper.priceNewProducts(productsNew);

  res.render("client/pages/home/index", {
    pageTitle: "Trang chủ",
    productsFeatured: newProductsFeatured,
    productsNew: newProductsNew,
  });
};
