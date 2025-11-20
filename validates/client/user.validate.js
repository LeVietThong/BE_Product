module.exports.registerPost = (req, res, next) => {
  if (!req.body.fullName) {
    req.flash("error", `Vui lòng nhập họ tên!`);
    res.redirect("/user/register");
    return;
  }

  if (!req.body.email) {
    req.flash("error", `Vui lòng nhập email!`);
    res.redirect("/user/register");
    return;
  }

  if (!req.body.password) {
    req.flash("error", `Vui lòng nhập mật khẩu!`);
    res.redirect("/user/register");
    return;
  }

  next();
};