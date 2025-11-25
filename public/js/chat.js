//CLIENT_SEND_MESSAGE
const formSendMessage = document.querySelector(".chat .inner-form");
if (formSendMessage) {
  formSendMessage.addEventListener("submit", (event) => {
    event.preventDefault();
    const content = event.target.elements.content.value;
    //const images = upload.cachedFileArray;
    if (content) {
      socket.emit("CLIENT_SEND_MESSAGE", {
        content: content,
        //images: images
      });
      event.target.elements.content.value = "";
      //upload.resetPreviewPanel();
    }
  });
}
//End CLIENT_SEND_MESSAGE

//SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {
  const myId = document.querySelector("[my-id]").getAttribute("my-id");
  const body = document.querySelector(".chat .inner-body");
  const div = document.createElement("div");
  let htmlFullName = "";

  if(myId == data.userId) {
    div.classList.add("inner-outgoing");
  } else {
    htmlFullName = `<div class="inner-name">${data.fullName}</div>`;
    div.classList.add("inner-incoming");
  }

  div.classList.add("inner-incoming");
  div.innerHTML = `
    ${htmlFullName}
    <div class="inner-content">${data.content}</div>
  `;
  body.appendChild(div);

  body.scrollTop = body.scrollHeight;
});
//End SERVER_RETURN_MESSAGE
