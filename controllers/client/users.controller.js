const User = require("../../models/user.model");
const usersSocket = require("../../sockets/client/users.socket");

//[GET] /users/not-friend
module.exports.notFriend = async (req, res) => {
  usersSocket(res);

  const userId = res.locals.user.id;

  const myUser = await User.findOne({
    _id: userId,
  });

  const requestFriends = myUser.requestFriends;
  const acceptFriends = myUser.acceptFriends;

  const users = await User.find({
    $and: [
      { _id: { $ne: userId } },
      { _id: { $nin: requestFriends } },
      { _id: { $nin: acceptFriends } },
    ],
    status: "active",
    delete: false,
  }).select("id avatar fullName");

  res.render("client/pages/users/not-friend", {
    pageTitle: "Danh sách người dùng",
    users: users,
  });
};

//[GET] /users/request
module.exports.request = async (req, res) => {
  usersSocket(res);

  const userId = res.locals.user.id;

  const myUser = await User.findOne({
    _id: userId,
  });

  const requestFriends = myUser.requestFriends;

  const users = await User.find({
    _id: { $in: requestFriends },
    status: "active",
    delete: false,  
  }).select("id avatar fullName");

  res.render("client/pages/users/request", {
    pageTitle: "Lời mời đã gửi",
    users: users,
  });
};

//[GET] /users/accept
module.exports.accept = async (req, res) => {
  usersSocket(res);

  const userId = res.locals.user.id;

  const myUser = await User.findOne({
    _id: userId,
  });

  const acceptFriends = myUser.acceptFriends;

  const users = await User.find({
    _id: { $in: acceptFriends },
    status: "active",
    delete: false,  
  }).select("id avatar fullName");

  res.render("client/pages/users/accept", {
    pageTitle: "Lời mời đã nhận",
    users: users,
  });
};

//[GET] /users/friends
module.exports.friends = async (req, res) => {
  usersSocket(res);

  const userId = res.locals.user.id;

  const myUser = await User.findOne({
    _id: userId,
  });

  const friendsList = myUser.friendsList;
  const friendsListId = friendsList.map(item => item.user_id);

  const users = await User.find({
    _id: { $in: friendsListId },
    status: "active",
    delete: false,  
  }).select("id avatar fullName statusOnline");

  for (const user of users) {
    const infoFriend = friendsList.find(friend => friend.user_id == user.id);
    user.infoFriend = infoFriend;
  }

  res.render("client/pages/users/friends", {
    pageTitle: "Danh sách bạn bè",
    users: users,
  });
};

