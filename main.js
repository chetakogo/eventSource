(()=>{"use strict";class t{constructor(t){this.parentEl=t,this.activeId=null,this.name=null,this.active=null,this.ws=new WebSocket("wss://websocke-heroku.herokuapp.com//ws"),this.idIvan=null}start(t){this.userList=this.parentEl.querySelector(".user-list"),this.chatArea=this.parentEl.querySelector(".chat-area"),this.inputChat=this.parentEl.querySelector(".input-chat"),this.msgForm=this.parentEl.querySelector(".msg-form"),this.userList.addEventListener("click",(t=>this.disableUser(t))),this.msgForm.addEventListener("submit",(t=>this.createChat(t))),this.showUserList(t),this.sortMessages()}disableUser(e){if(e.preventDefault(),e.target.classList.contains("login-status")&&(e.target.classList.toggle("check"),!e.target.classList.contains("check"))){const s=e.target.closest(".user-container").dataset.id,i=JSON.stringify({event:"disableUser",removeId:s});this.ws.readyState===WebSocket.OPEN&&this.ws.send(i),this.ws.addEventListener("message",(e=>{const s=JSON.parse(e.data);t.clearChat(),this.showUserList(s.message),this.sortMessages()}))}}createChat(t){if(t.preventDefault(),!this.active)return void this.clearMessages();const e=this.inputChat.value;this.createMessege(e,this.activeId),this.showMessegeBot()}showUserList(t){this.clearMessages(),Array.from(t).forEach((t=>{const{id:e,name:s,active:i,status:r}=t;let n,a;"Ivan"===s&&(this.idIvan=e),n=!0===r||!0===r?"check":"",this.name=s,this.active=i;const o=document.createElement("div");o.classList.add("user-container"),o.dataset.id=e,!0===this.active||"true"===this.active?(this.activeId=e,a=`Вы (${this.name})`,o.classList.add("invalid")):a=this.name,o.innerHTML=`<div class="login-status ${n}"></div>                        <div class="login">${a}</div>`,this.userList.append(o);t.msg.length&&this.showMessageChat(t.msg)}))}showMessageChat(e){e.forEach((e=>{const{userId:s,created:i,message:r}=e,n=t.formatDate(i);let a,o;!0===this.active||"true"===this.active?(a="message-you",o="Вы"):(a="message-client",o=this.name);const c=document.createElement("div");c.dataset.userId=s,c.id=Date.parse(i),c.classList.add("message",`${a}`),c.innerHTML=`<div class="message-time">${o}, ${n}</div>                 <div class="message-text">${r}</div>`,this.chatArea.append(c),c.scrollIntoView(!1)}))}sortMessages(){const t=[...this.chatArea.children],e=t.sort(((t,e)=>t.id-e.id));t.forEach((t=>{t.remove()})),e.forEach((t=>this.chatArea.append(t)))}createMessege(e,s){const i={idUser:s,created:new Date,message:e},r=JSON.stringify({event:"createMessage",createMsg:i});this.ws.readyState===WebSocket.OPEN&&this.ws.send(r),this.ws.addEventListener("message",(e=>{const s=JSON.parse(e.data);t.clearChat(),this.showUserList(s.message),this.sortMessages()}))}static formatDate(t){const e=new Date(t);let s=e.getDate();const i=e.getMonth(),r=e.getFullYear();let n=e.getHours(),a=e.getMinutes();return s=s<10?`0${s}`:s,n=n<10?`0${n}`:n,a=a<10?`0${a}`:a,`${n}:${a}  ${s}.${i}.${r}`}static clearChat(){document.querySelectorAll(".user-container").forEach((t=>{t.remove()}));document.querySelectorAll(".message").forEach((t=>{t.remove()}))}clearMessages(){this.inputChat.value=""}showMessegeBot(){const e=t.getBotText();this.renderBotText(e)}static getBotText(){const t=["Добрый день.","Что!?","Дома","?! У вас все в порядке?","Дайте телефон вашего Администратора!","Я уже отвечал на этот вопро.","youtube","Ну ладно:)","Очень, очень хорошо!","Я не звонил вам!","Спасибо!!!!"];return t[Math.floor(Math.random()*t.length)]}renderBotText(t){if(!Array.from(this.userList.querySelectorAll(".user-container")).find((t=>t.dataset.id===this.idIvan)))return;const e=Math.floor(Math.random()*(200*t.length));setTimeout((()=>{this.createMessege(t,this.idIvan)}),e)}}class e{constructor(t){if(!t)throw Error("Элемент не найден");this.parentEl=t,this.widget=document.createElement("div")}init(){this.widget.classList.add("widget","login-widget","hidden"),this.widget.innerHTML='<div class="login-control">\n                     <h3 class="login-title">Выберите псевдоним</h3>\n                     <form class="login-form">\n                       <input type="text" class="input input-nickname" required>\n                       <div class="error-container">\n                         <span class="error-text"></span>\n                       </div>\n                       <div class="btn-box">\n                         <button class="continue-btn">Продолжить</button>\n                       </div>\n                     </form>\n                   </div>\n',this.parentEl.append(this.widget),this.loginform=this.widget.querySelector(".login-form"),this.inputNickname=this.widget.querySelector(".input-nickname"),this.errorText=this.widget.querySelector(".error-text"),this.errorText.textContent.trim(),this.continueBtn=this.widget.querySelector(".continue-btn")}openLoginWidget(t){this.widget.classList.remove("hidden"),this.widget.style.top=(window.innerHeight-this.widget.offsetHeight)/2+"px",this.widget.style.left=(window.innerWidth-this.widget.offsetWidth)/2+"px",this.loginform.addEventListener("submit",t)}closeLoginWidget(){this.widget.classList.add("hidden"),this.loginform.reset()}}class s{constructor(t){if(!t)throw Error("Элемент не найден");this.parentEl=t,this.widget=document.createElement("div")}init(){this.widget.classList.add("chat-widget","hidden"),this.widget.innerHTML='<div class="chat-container">\n                      <div class="user-list"></div>\n                      <div class="chat-messages">\n                        <div class="chat-area"></div>\n                        <form class="msg-form">\n                          <input type="text" class="input input-chat" placeholder="Введите ваше сообщение..." required>\n                        </form>\n                      </div>\n                    </div>\n',this.parentEl.prepend(this.widget),this.userList=document.querySelector(".user-list"),this.msgForm=this.widget.querySelector(".msg-form"),this.inputChat=this.widget.querySelector(".input-chat")}openChatWidget(t){this.widget.classList.remove("hidden"),this.msgForm.addEventListener("submit",t)}closeChatWidgetl(){this.widget.classList.add("hidden")}}const i=new class{constructor(t){this.url=t,this.contentTypeHeader={"Content-Type":"application/json"}}load(){return fetch(this.url)}add(t){return fetch(this.url,{body:JSON.stringify(t),method:"POST",headers:this.contentTypeHeader})}remove(t){return fetch(`${this.url}/${t}`,{method:"DELETE"})}loginOut(){return fetch(this.url,{method:"PUT"})}}("https://websocke-heroku.herokuapp.com/contacts"),r=new t(document.querySelector(".container")),n=new class{constructor(t,e){this.api=t,this.chat=e,this.container=null,this.createLogin=this.createLogin.bind(this)}bindToDOM(t){if(!(t instanceof HTMLElement))throw new Error('Контейнер не является элементом "HTMLElement"');this.container=t,this.loginWidget=new e(this.container),this.chatWidget=new s(this.container)}init(){this.loginWidget.init(),this.chatWidget.init(),this.loginWidget.openLoginWidget((t=>this.createLogin(t))),this.loginWidget.inputNickname.addEventListener("click",(t=>{""!==t.target.closest(".login-form").querySelector(".error-text").textContent&&this.clearErrorMessage()}))}createLogin(t){t.preventDefault();const e=t.target.elements[0].value,s=e.trim();(async()=>{const i=await this.api.load();if(i.ok){const r=await i.json();r.find((t=>!0===t.active||"true"===t.active))&&this.api.loginOut();const n=r.find((t=>t.name.toLowerCase()===s.toLowerCase()));if(t.target.reset(),n)this.showErrorMessage("Такой никнэйм уже существует, выберите другое имя!"),this.loginWidget.inputNickname.blur();else{await this.api.add({name:e,active:!0,status:!0,msg:[]}),this.loginWidget.closeLoginWidget();const t=await this.api.load();if(t.ok){const e=await t.json();this.chatWidget.openChatWidget(this.chat.start(e))}}}})()}showErrorMessage(t){this.loginWidget.errorText.classList.add("invalid"),this.loginWidget.errorText.innerHTML=t}clearErrorMessage(){this.loginWidget.errorText.classList.remove("invalid"),this.loginWidget.errorText.innerHTML=""}}(i,r);n.bindToDOM(document.querySelector(".container")),n.init()})();