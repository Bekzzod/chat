const socket = io("http://localhost:3000");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");
const messageContainer = document.getElementById("message-container");

const name = prompt("What is your name?");
appendMessage('You joined');
socket.emit('new user', name);

socket.on('user-connected', data => {
  appendMessage(`${data} joined`);
})

socket.on('chat-message', data => {
  appendUserMessage(data.name, data.message);
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} left`);
})


messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value;
  appendUserMessage('You', message);
  socket.emit('send-chat-message', message);
  messageInput.value = '';
})

function appendMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageElement.classList.add("sys-message");
  messageContainer.append(messageElement);
  messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight;
}

function appendUserMessage(name, text) {
  const today = new Date();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  const messageElement = document.createElement('div');
  const messageAuthor = document.createElement('div');
  messageAuthor.innerText = name + ' ' + time;
  const messageText = document.createElement('div');
  messageText.innerText = text;
  messageElement.classList.add("message");
  messageAuthor.classList.add("message-author");
  messageText.classList.add("message-text");
  messageElement.append(messageAuthor);
  messageElement.append(messageText);
  messageContainer.append(messageElement);
  messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight;
}