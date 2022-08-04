export default class Chat {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.activeId = null;
    this.name = null;
    this.active = null;
    this.ws = new WebSocket('wss://sse-ws-chat-backend.herokuapp.com//ws');
    this.idIvan = null;
  }

  start(contacts) {
    this.userList = this.parentEl.querySelector('.user-list');
    this.chatArea = this.parentEl.querySelector('.chat-area');
    this.inputChat = this.parentEl.querySelector('.input-chat');
    this.msgForm = this.parentEl.querySelector('.msg-form');

    this.userList.addEventListener('click', (event) => this.disableUser(event));
    this.msgForm.addEventListener('submit', (event) => this.createChat(event));

    this.showUserList(contacts);
    this.sortMessages();
  }

  disableUser(event) {
    event.preventDefault();

    if (!event.target.classList.contains('login-status')) return;
    event.target.classList.toggle('check');

    if (!event.target.classList.contains('check')) {
      const removeId = event.target.closest('.user-container').dataset.id;
      const data = JSON.stringify({
        event: 'disableUser',
        removeId,
      });

      if (this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(data);
      }

      this.ws.addEventListener('message', (evt) => {
        const msg = JSON.parse(evt.data);
        Chat.clearChat();
        this.showUserList(msg.message);
        this.sortMessages();
      });
    }
  }

  createChat(event) {
    event.preventDefault();

    if (!this.active) {
      this.clearMessages();
      return;
    }

    const messages = this.inputChat.value;
    this.createMessege(messages, this.activeId);
    this.showMessegeBot();
  }

  showUserList(contacts) {
    this.clearMessages();

    Array.from(contacts).forEach((item) => {
      const {
        id, name, active, status,
      } = item;

      if (name === 'Ivan') {
        this.idIvan = id;
      }

      let checked;
      let nickName;

      if (status === true || status === true) {
        checked = 'check';
      } else {
        checked = '';
      }

      this.name = name;
      this.active = active;

      const userEl = document.createElement('div');
      userEl.classList.add('user-container');
      userEl.dataset.id = id;

      if (this.active === true || this.active === 'true') {
        this.activeId = id;
        nickName = `Вы (${this.name})`;
        userEl.classList.add('invalid');
      } else {
        nickName = this.name;
      }

      userEl.innerHTML = `<div class="login-status ${checked}"></div>`
        + `                        <div class="login">${nickName}</div>`;
      this.userList.append(userEl);
      const msglength = item.msg.length;

      if (msglength) {
        this.showMessageChat(item.msg);
      }
    });
  }

  showMessageChat(messages) {
    messages.forEach((item) => {
      const { userId, created, message } = item;
      const formated = Chat.formatDate(created);
      let messageActive;
      let activeUser;

      if (this.active === true || this.active === 'true') {
        messageActive = 'message-you';
        activeUser = 'Вы';
      } else {
        messageActive = 'message-client';
        activeUser = this.name;
      }

      const messageEl = document.createElement('div');
      messageEl.dataset.userId = userId;
      messageEl.id = Date.parse(created);
      messageEl.classList.add('message', `${messageActive}`);
      messageEl.innerHTML = `<div class="message-time">${activeUser}, ${formated}</div>`
        + `                 <div class="message-text">${message}</div>`;

      this.chatArea.append(messageEl);
      messageEl.scrollIntoView(false);
    });
  }

  sortMessages() {
    const chatElements = [...this.chatArea.children];
    const sortedChatElements = chatElements.sort((a, b) => a.id - b.id);
    chatElements.forEach((item) => {
      item.remove();
    });
    sortedChatElements.forEach((elem) => this.chatArea.append(elem));
  }

  createMessege(message, idClient) {
    const created = new Date();
    const idUser = idClient;

    const createMsg = ({ idUser, created, message });
    const data = JSON.stringify({
      event: 'createMessage',
      createMsg,
    });

    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(data);
    }

    this.ws.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data);
      Chat.clearChat();
      this.showUserList(msg.message);
      this.sortMessages();
    });
  }

  static formatDate(date) {
    const data = new Date(date);

    let day = data.getDate();
    const month = data.getMonth();
    const year = data.getFullYear();
    let hour = data.getHours();
    let minutes = data.getMinutes();

    day = day < 10 ? `0${day}` : day;
    hour = hour < 10 ? `0${hour}` : hour;
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hour}:${minutes}  ${day}.${month}.${year}`;
  }

  static clearChat() {
    const userLisrt = document.querySelectorAll('.user-container');
    userLisrt.forEach((item) => {
      item.remove();
    });
    const messagesEl = document.querySelectorAll('.message');
    messagesEl.forEach((item) => {
      item.remove();
    });
  }

  clearMessages() {
    this.inputChat.value = '';
  }

  showMessegeBot() {
    const botText = Chat.getBotText();
    this.renderBotText(botText);
  }

  static getBotText() {
    const botText = [
      'Добрый день.',
      'Что!?',
      'Дома',
      '?! У вас все в порядке?',
      'Дайте телефон вашего Администратора!',
      'Я уже отвечал на этот вопро.',
      'youtube',
      'Ну ладно:)',
      'Очень, очень хорошо!',
      'Я не звонил вам!',
      'Спасибо!!!!',
    ];
    const index = Math.floor(Math.random() * botText.length);

    return botText[index];
  }

  renderBotText(botText) {
    const activeidIvan = Array.from(this.userList.querySelectorAll('.user-container')).find((item) => item.dataset.id === this.idIvan);
    if (!activeidIvan) {
      return;
    }
    const delay = Math.floor(Math.random() * (botText.length * 200));
    setTimeout(() => {
      this.createMessege(botText, this.idIvan);
    }, delay);
  }
}
