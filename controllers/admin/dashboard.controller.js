const ProductCategory = require("../../models/product-category.model");
const Account = require("../../models/account.model");
const User = require("../../models/user.model");
const Product = require("../../models/product.model");

// [GET] /admin/dashboard
module.exports.dashboard = async (req, res) => {
  const statistic = {
    categoryProduct: {
      total: 0,
      active: 0,
      inactive: 0,
    },
    product: {
      total: 0,
      active: 0,
      inactive: 0,
    },
    account: {
      total: 0,
      active: 0,
      inactive: 0,
    },
    user: {
      total: 0,
      active: 0,
      inactive: 0,
    },
  };

  // categoryProduct
  statistic.categoryProduct.total = await ProductCategory.countDocuments({
    delete: false,
  });

  statistic.categoryProduct.active = await ProductCategory.countDocuments({
    status: "active",
    delete: false,
  });

  statistic.categoryProduct.inactive = await ProductCategory.countDocuments({
    status: "inactive",
    delete: false,
  });
  // End categoryProduct

  // product
  statistic.product.total = await Product.countDocuments({ delete: false });

  statistic.product.active = await Product.countDocuments({
    status: "active",
    delete: false,
  });

  statistic.product.inactive = await Product.countDocuments({
    status: "inactive",
    delete: false,
  });
  // End product

  // account
  statistic.account.total = await Account.countDocuments({ delete: false });

  statistic.account.active = await Account.countDocuments({
    status: "active",
    delete: false,
  });

  statistic.account.inactive = await Account.countDocuments({
    status: "inactive",
    delete: false,
  });
  // End account

  // user
  statistic.user.total = await User.countDocuments({ delete: false });

  statistic.user.active = await User.countDocuments({
    status: "active",
    delete: false,
  });

  statistic.user.inactive = await User.countDocuments({
    status: "inactive",
    delete: false,
  });
  // End user

  res.render("admin/pages/dashboard/index", {
    pageTitle: "Trang tổng quan",
    statistic: statistic,
  });
};
