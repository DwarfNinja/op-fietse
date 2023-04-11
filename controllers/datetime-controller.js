import { storageService } from '../services';

export class DateTimeController {
  host;

  constructor(host) {
    this.host = host;
    host.addController(this);
  }

  setDateTime() {
    if (storageService.tempRepairExists()) {
      const tempRepair = storageService.getTempRepair();
      this.host.date = tempRepair.datetimecreated.date;
      this.host.time = tempRepair.datetimecreated.time;
      return;
    }
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
