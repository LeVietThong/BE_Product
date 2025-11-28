const RoomChat = require("../../models/room-chat.model");

module.exports.isAccess = async (req, res, next) => {
  try {
    const roomChatId = req.params.roomChatId;
    const userId = res.locals.user.id;

    const roomChat = await RoomChat.findOne({
      _id: roomChatId,
      delete: false,
      "users.user_id": userId,
    });

    if (roomChat) {
      next();
    } else {
      res.redirect("/");
    }
  } catch (error) {
    res.redirect("/");
  }
};
