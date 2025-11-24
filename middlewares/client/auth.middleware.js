const User = require("../../models/user.model");

const systemConfig = require("../../config/system");

module.exports.requireAuth = async (req, res, next) => {
  if (req.cookies && req.cookies.tokenUser) {
    const user = await User.findOne({
      tokenUser: req.cookies.tokenUser,
      delete: false,
    }).select("-password");

    if (!user) {
      res.redirect(`/user/login`);
    } else {
      res.locals.user = user;
      next();
    }
  } else {
    res.redirect(`/user/login`);
  }
};
