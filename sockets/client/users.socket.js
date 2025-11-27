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

      //Lấy ra độ dài acceptFriends của B và trả về
      const infoUserB = await User.findOne({
        _id: userId,
      });
      const lengthAcceptFriends = infoUserB.acceptFriends.length;

      socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", {
        userId: userId,
        lengthAcceptFriends: lengthAcceptFriends,
      });

      //Lấy info của A và trả về cho B
      const infoUserA = await User.findOne({
        _id: myUserId,
      }).select("id avatar fullName");

      socket.broadcast.emit("SERVER_RETURN_INFO_ACCEPT_FRIEND",{
        userId: userId,
        infoUserA: infoUserA
      });
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

      //Lấy ra độ dài acceptFriends của B và trả về client
      const infoUserB = await User.findOne({
        _id: userId,
      });
      const lengthAcceptFriends = infoUserB.acceptFriends.length;

      socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", {
        userId: userId,
        lengthAcceptFriends: lengthAcceptFriends,
      });

      //Lấy id của A và trả về cho B
      socket.broadcast.emit("SERVER_RETURN_USER_ID_CANCEL_FRIEND", {
        userIdB: userId,
        userIdA: myUserId,
      });
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

    //Chức năng chấp nhận yêu cầu
    socket.on("CLIENT_ACCEPT_FRIEND", async (userId) => {
      const myUserId = res.locals.user.id;

      //Xóa id của A vào acceptFriends của B
      const existUser = await User.findOne({
        _id: myUserId,
        acceptFriends: userId,
      });

      if (existUser) {
        await User.updateOne(
          { _id: myUserId },
          {
            $push: { friendsList: { user_id: userId, room_chat_id: "" } },
            $pull: { acceptFriends: userId },
          }
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
          {
            $push: { friendsList: { user_id: myUserId, room_chat_id: "" } },
            $pull: { requestFriends: myUserId },
          }
        );
      }
    });
  });
};
