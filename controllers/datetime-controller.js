export class DateTimeController {
  host;

  constructor(host) {
    this.host = host;
    host.addController(this);
  }

  setDateTime() {
    this.host.date = new Date().toLocaleDateString().toString().replaceAll('/', '-');
    this.setTime();
    this.host.dispatchEvent(new CustomEvent('datetime-created-changed', {
      detail: { date: this.host.date, time: this.host.time },
    }));
  }

  setTime() {
    this.host.time = new Date().toLocaleTimeString().substring(0, 5);
    setTimeout(() => this.setTime(), 1000);
  }
}
