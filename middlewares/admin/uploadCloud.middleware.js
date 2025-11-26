const uploadToCloud = require("../../helpers/uploadToCloud");

module.exports.upload = async (req, res, next) => {
  if (req.file) {
    const link = await uploadToCloud(req);
    req.body[req.file.fieldname] = link;
  }

  next();
};