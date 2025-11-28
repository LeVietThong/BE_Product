const User = require("../../models/user.model");
const RoomChat = require("../../models/room-chat.model");

//[GET] /rooms-chat/
module.exports.index = async (req, res) => {
  const userId = res.locals.user.id;

  const listRoomChat = await RoomChat.find({
    typeRoom: "group",
    delete: false,
    "users.user_id": userId,
  });

  res.render("client/pages/rooms-chat/index", {
    pageTitle: "Danh sách phòng",
    listRoomChat: listRoomChat,
  });
};

//[GET] /rooms-chat/
module.exports.create = async (req, res) => {
  const friendsList = res.locals.user.friendsList;

  for (friend of friendsList) {
    const infoFriend = await User.findOne({
      _id: friend.user_id,
      delete: false,
    }).select("fullName avatar");

    friend.infoFriend = infoFriend;
  }

  res.render("client/pages/rooms-chat/create", {
    pageTitle: "Tạo phòng",
    friendsList: friendsList,
  });
};

//[POST] /rooms-chat/
module.exports.createPost = async (req, res) => {
  const title = req.body.title;
  const usersId = req.body.usersId;

  const dataRoom = {
    title: title,
    typeRoom: "group",
    users: [],
  };

  for (const userId of usersId) {
    dataRoom.users.push({
      user_id: userId,
      role: "user",
    });
  }

  dataRoom.users.push({
    user_id: res.locals.user.id,
    role: "superAdmin",
  });

  const roomChat = new RoomChat(dataRoom);
  await roomChat.save();

  res.redirect(`/chat/${roomChat.id}`);
};
