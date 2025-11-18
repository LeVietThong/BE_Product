const systemConfig = require("../../config/system");
const md5 = require("md5");
const Account = require("../../models/account.model");
// [GET] /admin/profile
module.exports.index = async (req, res) => {
  res.render("admin/pages/profiles/index", {
    pageTitle: "Thông tin cá nhân",
  });
};

// [GET] /admin/profile/edit
module.exports.edit = async (req, res) => {
  res.render("admin/pages/profiles/edit", {
    pageTitle: "Chỉnh sửa thông tin cá nhân",
  });
};

//[PATCH] /admin/profiles/edit
module.exports.editPatch = async (req, res) => {
  const id = res.locals.user.id;

  const emailExist = await Account.findOne({
    _id: { $ne: id },
    email: req.body.email,
    delete: false,
  });

  if(emailExist){
    req.flash("error", `Email ${req.body.email} đã tồn tại`);
  } else {
    if (req.body.password) {
      req.body.password = md5(req.body.password);
    } else {
      delete req.body.password;
    }

    await Account.updateOne({_id: id,},req.body);
    req.flash("success", "Cập nhật tài khoản thành công");
  }

  res.redirect(`${systemConfig.prefixAdmin}/profiles/edit`);
};
