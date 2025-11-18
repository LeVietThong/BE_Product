const express = require("express");
const multer = require("multer");
const route = express.Router();

const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

const controller = require("../../controllers/admin/profile.controller");

route.get("/", controller.index);

route.get("/edit", controller.edit);

route.patch(
  "/edit",
  upload.single("avatar"),
  uploadCloud.upload,
  controller.editPatch
);

module.exports = route;
