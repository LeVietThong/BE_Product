const Account = require("../../models/account.model");

const systemConfig = require("../../config/system");

module.exports.requireAuth = async (req, res, next) => {
  if (req.cookies && req.cookies.token) {
    const user = await Account.findOne({
      token: req.cookies.token,
      delete: false,
    });

    if (!user) {
      res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    } else {
      next();
    }
  } else {
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
  }
}