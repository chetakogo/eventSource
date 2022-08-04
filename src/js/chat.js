import GUI from './gui';

export default class Chat {
  constructor(host, server) {
    this.host = host;
    this.server = server;
    this.connect = false;
    this.gui = new GUI(host);
    this.begin = this.begin.bind(this);
    this.input = this.host.querySelector('.input-chat');
  }

  init() {
    const win = {
      head: 'Введите псевдоним',
      input: {
        head: '',
        value: '',
      },
      button: {
        cancel: 'Отмена',
        ok: 'Продолжить',
        position: 'center',
      },
    };
    this.gui.winModalDialog(win, () => this.begin());
  }

  begin() {
    this.NikName = this.gui.winModal.querySelector('.input-ask').value;
    this.ws = new WebSocket(this.server);
    this.ws.addEventListener('open', () => {
      this.ws.send(JSON.stringify({
        event: 'connected',
        message: this.NikName,
      }));
    });

    this.ws.addEventListener('message', (e) => {
      const msg = JSON.parse(e.data);
      switch (msg.event) {
        case 'connect':
          this.gui.closeWinModal();
          this.nikName = msg.message;
          break;
        case 'system':
          this.gui.showAside(msg.message.users, this.nikName);
          break;
        case 'message':
          this.gui.showParnersMsg(msg.message, this.nikName);
          break;
        default:
          break;
      }
    });

    this.ws.addEventListener('close', (e) => {
      if (e.reason) {
        const input = this.gui.winModal.querySelector('.input-ask');
        if (input !== null) {
          input.value = e.reason;
          input.style.outline = 'solid red';
          input.style.borderColor = 'red';
          setTimeout(() => {
            this.gui.closeWinModal();
            this.init();
          }, 1000);
        }
      }
    });

    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && this.input.value.trim()) {
        const time = new Date().toLocaleString([], {
          hour: '2-digit', minute: '2-digit',
        }).replace(/,/, '');
        const date = new Date().toLocaleString([], {
          day: '2-digit', month: '2-digit', year: '2-digit',
        }).replace(/,/, '');
        this.gui.showMsg(this.input.value, `${time} ${date}`);
        this.sendMsg(this.input.value, `${time} ${date}`);
        this.input.value = '';
      }
    });
  }

  sendMsg(msg, timeStamp) {
    this.ws.send(JSON.stringify({
      name: this.nikName,
      event: 'message',
      message: msg,
      date: timeStamp,
    }));
  }
}
