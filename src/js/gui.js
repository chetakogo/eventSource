/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
export default class GUI {
  constructor(host) {
    this.host = host;
    this.closeWinModal = this.closeWinModal.bind(this);
    this.chatBody = host.querySelector('.chat-body');
  }

  winModalDialog(obj = {}, callback) {
    this.winModal = document.createElement('div');
    this.winModal.className = 'windowAsk-wrapper';
    const divWindow = document.createElement('div');
    divWindow.className = 'window-ask';

    let winHTML = '';
    for (const key in obj) {
      switch (key) {
        case 'head':
          winHTML += `<div class="head-ask">${obj[key]}</div>`;
          break;
        case 'input':
          winHTML += `
            <div class="input-ask-block">
              <div class="head-input-ask">${obj[key].head}</div>
              <input class="input-ask" type="text" value="${obj[key].value}" required>
            </div>
          `;
          break;
        case 'textArea':
          winHTML += `
            <div class="input-ask-block">
              <div class="head-textarea-ask">${obj[key].head}</div>
              <textarea class="input-ask textarea-ask" required>${obj[key].value}</textarea>
            </div>
          `;
          break;
        case 'text':
          winHTML += `<div class="body-ask">${obj[key]}</div>`;
          break;
        case 'button':
          winHTML += '<div class="btn-ask">';
          if (obj[key].ok !== '') {
            winHTML += `<button class="btnOk">${obj[key].ok}</button>`;
          }
          if (obj[key].cancel !== '') {
            winHTML += `<button class="btnCancel">${obj[key].cancel}</button>`;
          }
          winHTML += '</div>';
          break;

        default:
          break;
      }
    }

    divWindow.innerHTML = winHTML;

    this.winModal.appendChild(divWindow);
    document.body.appendChild(this.winModal);

    this.ok = this.winModal.querySelector('.btnOk');
    if (this.ok) {
      this.ok.addEventListener('click', this.checkValidity.bind(this, callback));
      this.ok.addEventListener('keydown', this.eventKey.bind(this, callback));
    }

    this.cancel = this.winModal.querySelector('.btnCancel');
    if (this.cancel) {
      this.cancel.addEventListener('keydown', this.eventKey);
      this.cancel.addEventListener('click', this.closeWinModal);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  checkValidity(callback, e) {
    const arr = e.target.closest('.window-ask').querySelectorAll('.input-ask');
    for (let i = 0; i < arr.length; i += 1) {
      if (!arr[i].checkValidity()) {
        arr[i].style.outline = 'solid red';
        arr[i].style.borderColor = 'red';
        setTimeout(() => {
          arr[i].style.outline = '';
          arr[i].style.borderColor = '';
        }, 1000);
        return;
      }
    }
    callback();
  }

  eventKey(callback, e) {
    if (typeof e !== 'undefined') {
      if (e.key === 'Enter' && e.target.classList.contains('btnOk')) {
        const arr = e.target.closest('.window-ask').querySelectorAll('.input-ask');
        for (let i = 0; i < arr.length; i += 1) {
          if (!arr[i].checkValidity()) {
            arr[i].style.outline = 'solid red';
            arr[i].style.borderColor = 'red';
            setTimeout(() => {
              arr[i].style.outline = '';
              arr[i].style.borderColor = '';
            }, 1000);
            return;
          }
        }
        callback();
      }
      if (e.target.classList.contains('btnCancel')) {
        this.closeWinModal();
      }
    }
  }

  closeWinModal() {
    this.winModal.remove();
  }

  // ---------------------------- add parts ---------------------------------

  showConnect(msg) {
    const div = document.createElement('div');
    div.className = 'chat-msg-block';
    div.style.justifyContent = 'center';
    div.innerHTML = `
      <div class="block-msg">
        <p class"msg-body">${msg}</p>  
      </div>
      `;
    this.chatBody.appendChild(div);
    this.chatBody.scrollTop = this.chatBody.scrollHeight;
  }

  showMsg(msg, date) {
    const div = document.createElement('div');
    div.className = 'chat-msg-block';
    div.style.justifyContent = 'right';
    div.innerHTML = `
      <div class="block-msg">
        <p class="msg-head">Yuо, ${date}</p>
        <p class="msg-body">${msg}</p>
      </div>
      `;
    this.chatBody.appendChild(div);
    this.chatBody.scrollTop = this.chatBody.scrollHeight;
  }

  showParnersMsg(msg, nik) {
    if (msg.name !== nik) {
      const div = document.createElement('div');
      div.className = 'chat-msg-block';
      div.style.justifyContent = 'left';
      div.innerHTML = `
      <div class="block-msg-partner">
        <p class="msg-head-partner">${msg.name}, ${msg.date}</p>
        <p class="msg-body-partner">${msg.text}</p>
      </div>
      `;
      this.chatBody.appendChild(div);
      this.chatBody.scrollTop = this.chatBody.scrollHeight;
    }
  }

  showConnectClients(arr, msg) {
    if (Array.isArray(arr)) {
      arr.forEach((e) => {
        const div = document.createElement('div');
        div.className = 'chat-msg-block';
        div.style.justifyContent = 'center';
        div.innerHTML = `
      <div class="block-msg">
        <p class"msg-body">${e} ${msg}</p>  
      </div>
      `;
        this.chatBody.appendChild(div);
        this.chatBody.scrollTop = this.chatBody.scrollHeight;
      });
    }
  }

  showAside(arr, nik) {
    if (this.host.querySelector('.aside') !== null) {
      this.host.querySelector('.aside').remove();
    }
    const chat = this.host.querySelector('.chat-desk');
    const aside = document.createElement('div');
    chat.style.position = 'relative';
    aside.className = 'aside';
    aside.style.top = `${20}px`;
    aside.style.left = `${-250}px`;
    arr.forEach((e) => {
      const name = e === nik ? 'Yuo' : e;
      const nameClient = document.createElement('div');
      nameClient.className = 'aside-name-client';
      nameClient.innerHTML += `
         <div class="circle"></div>
        <p>${name}</p>
     `;
      aside.appendChild(nameClient);
    });
    chat.appendChild(aside);
  }
}
