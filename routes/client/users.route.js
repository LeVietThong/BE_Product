const express = require("express");
const route = express.Router();

const controller = require("../../controllers/client/users.controller");

const validate = require("../../validates/client/user.validate");
const authMiddleware = require("../../middlewares/client/auth.middleware");

route.get("/not-friend", controller.notFriend);

module.exports = route;
