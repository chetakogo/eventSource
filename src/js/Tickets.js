export default class Tickets {
  constructor(id, name, status, created) {
    this.ticketsWrapper = document.querySelector('.tickets');
    this.id = id;
    this.name = name;
    this.status = status;
    this.created = created;

    const formated = Tickets.formatDate(this.created);
    let checkbox;
    const ticket = document.createElement('div');
    ticket.classList.add('ticket');
    ticket.dataset.id = this.id;

    if (this.status === 'true' || this.status === true) {
      checkbox = 'checked';
    } else {
      checkbox = '';
    }

    ticket.innerHTML = '<div class="ticket-view">\n'
        + '                 <label class="ticket-label">\n'
        + `                   <input type="checkbox" class="ticket-checkbox" ${checkbox}>\n`
        + '                   <span class="ticket-span"></span>\n'
        + '                 </label>\n'
        + '                 <div class="ticket-content">\n'
        + `                   <div class="ticket-name">${this.name}</div>\n`
        + '                 </div>\n'
        + '               </div>\n'
        + `               <div class="ticket-created">${formated}</div>\n`
        + '               <div class="ticket-control">\n'
        + '                 <button type="button" class="edit-btn">&#9998</button>\n'
        + '                 <button type="button" class="delete-btn">X</button>\n'
        + '               </div>\n';

    return ticket;
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

    return `${day}.${month}.${year} ${hour}:${minutes}`;
  }
}
