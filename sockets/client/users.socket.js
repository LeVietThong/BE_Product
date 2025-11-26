const User = require("../../models/user.model");

module.exports = (res) => {
  _io.once("connection", (socket) => {
    socket.on("CLIENT_ADD_FRIEND", async (userId) => {
      const myUserId = res.locals.user.id;

      //Thêm id của A vào acceptFriends của B
      const existUser = await User.findOne({
        _id: userId,
        acceptFriends: myUserId
      });

      if (!existUser) {
        await User.updateOne({ _id: userId }, { $push: { acceptFriends: myUserId } });
      }

      //Thêm id của B vào requestFriends của A
      const existUser2 = await User.findOne({
        _id: myUserId,
        requestFriends: userId
      });

      if (!existUser2) {
        await User.updateOne({ _id: myUserId }, { $push: { requestFriends: userId } });
      }

      // _io.emit("SERVER_ADD_FRIEND", {
      //   myUserId: myUserId,
      //   userId: userId,
      // });

      // socket.on("disconnect", () => {
      //   _io.emit("SERVER_ADD_FRIEND", {
      //   myUserId: myUserId,
      //   userId: userId,
      // })
      // })
    });
  });
};
