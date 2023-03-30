import { storageService } from '../services';

export class RepairCardController {
  host;

  constructor(host) {
    this.host = host;
    host.addController(this);
  }

  addRepairCard() {
    storageService.setRepairInLocalStorage(this.repair);
    window.location.assign('../../index.html');
  }

  getNewId() {
    const ids = [];
    const repairList = storageService.getRepairsFromLocalStorage();
    repairList.forEach((repair) => {
      ids.push(repair.id);
    });
    return this.generateRandom(0, 999, ids);
  }

  generateRandom(min, max, except) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return except.includes(num) ? this.generateRandom(min, max) : num;
  }

  printRepairCard() {
    window.print();
  }
}
