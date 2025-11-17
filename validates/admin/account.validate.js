module.exports.createPost = (req, res, next) => {
  if (!req.body.fullName) {
    req.flash("error", `Vui lòng nhập họ tên!`);
    res.redirect("/admin/accounts/create");
    return;
  }

  if (!req.body.email) {
    req.flash("error", `Vui lòng nhập email!`);
    res.redirect("/admin/accounts/create");
    return;
  }

  if (!req.body.password) {
    req.flash("error", `Vui lòng nhập mật khẩu!`);
    res.redirect("/admin/accounts/create");
    return;
  }

  next();
};

module.exports.editPatch = (req, res, next) => {
  if (!req.body.fullName) {
    req.flash("error", `Vui lòng nhập họ tên!`);
    res.redirect(`${systemConfig.prefixAdmin}/accounts/edit/${req.params.id}`);
    return;
  }

  if (!req.body.email) {
    req.flash("error", `Vui lòng nhập email!`);
    res.redirect(`${systemConfig.prefixAdmin}/accounts/edit/${req.params.id}`);
    return;
  }

  next();
};
