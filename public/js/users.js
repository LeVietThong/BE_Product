//Chức năng gửi yêu cầu
const listBtnAddFriend = document.querySelectorAll("[btn-add-friend]");
if (listBtnAddFriend.length > 0) {
  listBtnAddFriend.forEach((button) => {
    button.addEventListener("click", () => {
      button.closest(".box-user").classList.add("add");

      const userId = button.getAttribute("btn-add-friend");

      socket.emit("CLIENT_ADD_FRIEND", userId);
    });
  });
}

//Chức năng hủy yêu cầu
const listBtnCancelFriend = document.querySelectorAll("[btn-cancel-friend]");
if (listBtnCancelFriend.length > 0) {
  listBtnCancelFriend.forEach((button) => {
    button.addEventListener("click", () => {
      button.closest(".box-user").classList.remove("add");

      const userId = button.getAttribute("btn-cancel-friend");

      socket.emit("CLIENT_CANCEL_FRIEND", userId);
    });
  });
}

//Chức năng từ chối yêu cầu
const refuseFriend = (button) => {
  btnRefuse.addEventListener("click", () => {
    btnRefuse.closest(".box-user").classList.add("refuse");

    const userId = btnRefuse.getAttribute("btn-refuse-friend");
    socket.emit("CLIENT_REFUSE_FRIEND", userId);
  });
};
const listBtnRefuseFriend = document.querySelectorAll("[btn-refuse-friend]");
if (listBtnRefuseFriend.length > 0) {
  listBtnRefuseFriend.forEach((button) => {
    refuseFriend(button);
  });
}

//Chức năng chấp nhận yêu cầu
const acceptFriend = (button) => {
  button.addEventListener("click", () => {
      button.closest(".box-user").classList.add("accepted");

      const userId = button.getAttribute("btn-accept-friend");

      socket.emit("CLIENT_ACCEPT_FRIEND", userId);
  });
}
const listBtnAcceptFriend = document.querySelectorAll("[btn-accept-friend]");
if (listBtnAcceptFriend.length > 0) {
  listBtnAcceptFriend.forEach((button) => {
    acceptFriend(button);
  });
}

//SERVER_RETURN_LENGTH_ACCEPT_FRIEND
const badgeUserAccept = document.querySelector("[badge-users-accept]");
if (badgeUserAccept) {
  const userId = badgeUserAccept.getAttribute("badge-users-accept");
  socket.on("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", (data) => {
    if (userId === data.userId) {
      badgeUserAccept.innerHTML = data.lengthAcceptFriends;
    }
  });
}

//SERVER_RETURN_INFO_ACCEPT_FRIEND
const dataUsersAccept = document.querySelector("[data-users-accept]");
if (dataUsersAccept) {
  const userId = dataUsersAccept.getAttribute("data-users-accept");
  socket.on("SERVER_RETURN_INFO_ACCEPT_FRIEND", (data) => {
    if (userId === data.userId) {
      const div = document.createElement("div");
      div.classList.add("col-6");

      div.innerHTML = `
        <div class="box-user">
          <div class="inner-avatar">
            <img src="https://robohash.org/hicveldicta.png" alt="${data.infoUserA.fullName}">
          </div>
          <div class="inner-info">
            <div class="inner-name">${data.infoUserA.fullName}</div>
            <div class="inner-buttons">
              <button 
                class="btn btn-sm btn-primary mr-1" 
                btn-accept-friend="${data.infoUserA._id}"
              >
                Chấp nhận
              </button>
              <button 
                class="btn btn-sm btn-secondary mr-1" 
                btn-refuse-friend="${data.infoUserA._id}"
              >
                Xóa
              </button>
              <button 
                class="btn btn-sm btn-secondary mr-1" 
                btn-deleted-friend="${data.infoA._id}"
                disabled=""
              >
                Đã xóa
              </button>
              <button 
                class="btn btn-sm btn-primary mr-1" 
                btn-accepted-friend="${data.infoUserA._id}"
                disabled=""
              >
                Đã chấp nhận
              </button>
            </div>
          </div>
        </div>
      `;

      dataUsersAccept.appendChild(div);

      const btnRefuse = div.querySelector("[btn-refuse-friend]");
      const btnAccept = div.querySelector("[btn-accept-friend]");

      refuseFriend(btnRefuse);
      acceptFriend(btnAccept);
    }
  });
}
