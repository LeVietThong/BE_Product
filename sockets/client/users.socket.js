const User = require("../../models/user.model");

module.exports = (res) => {
  _io.once("connection", (socket) => {
    //Chức năng gửi yêu cầu
    socket.on("CLIENT_ADD_FRIEND", async (userId) => {
      const myUserId = res.locals.user.id;

      //Thêm id của A vào acceptFriends của B
      const existUser = await User.findOne({
        _id: userId,
        acceptFriends: myUserId,
      });

      if (!existUser) {
        await User.updateOne(
          { _id: userId },
          { $push: { acceptFriends: myUserId } }
        );
      }

      //Thêm id của B vào requestFriends của A
      const existUser2 = await User.findOne({
        _id: myUserId,
        requestFriends: userId,
      });

      if (!existUser2) {
        await User.updateOne(
          { _id: myUserId },
          { $push: { requestFriends: userId } }
        );
      }
    });

    //Chức năng hủy yêu cầu
    socket.on("CLIENT_CANCEL_FRIEND", async (userId) => {
      const myUserId = res.locals.user.id;

      //Xóa id của A vào acceptFriends của B
      const existUser = await User.findOne({
        _id: userId,
        acceptFriends: myUserId,
      });

      if (existUser) {
        await User.updateOne(
          { _id: userId },
          { $pull: { acceptFriends: myUserId } }
        );
      }

      //Xóa id của B vào requestFriends của A
      const existUser2 = await User.findOne({
        _id: myUserId,
        requestFriends: userId,
      });

      if (existUser2) {
        await User.updateOne(
          { _id: myUserId },
          { $pull: { requestFriends: userId } }
        );
      }
    });

    //Chức năng từ chối yêu cầu
    socket.on("CLIENT_REFUSE_FRIEND", async (userId) => {
      const myUserId = res.locals.user.id;

      //Xóa id của A vào acceptFriends của B
      const existUser = await User.findOne({
        _id: myUserId,
        acceptFriends: userId,
      });

      if (existUser) {
        await User.updateOne(
          { _id: myUserId },
          { $pull: { acceptFriends: userId } }
        );
      }

      //Xóa id của B vào requestFriends của A
      const existUser2 = await User.findOne({
        _id: userId,
        requestFriends: myUserId,
      });

      if (existUser2) {
        await User.updateOne(
          { _id: userId },
          { $pull: { requestFriends: myUserId } }
        );
      }
    });
  });
};
