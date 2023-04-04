import { storageService, utilsService } from '../services';

export class RepairCardController {
  host;

  constructor(host) {
    this.host = host;
    host.addController(this);
  }

  addRepairCard() {
    this.repair.datetimestarted = { date: new Date().toLocaleDateString().toString().replaceAll('/', '-'), time: new Date().toLocaleTimeString().substring(0, 5) };
    storageService.setRepairInLocalStorage(this.repair);
    window.location.assign('../../index.html');
  }

  getNewId() {
    const ids = [];
    const repairList = storageService.getRepairsFromLocalStorage();
    repairList.forEach((repair) => {
      ids.push(repair.id);
    });
    return utilsService.generateRandom(0, 999, ids);
  }

  printRepairCard() {
    window.print();
  }
}
