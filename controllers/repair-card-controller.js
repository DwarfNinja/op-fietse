import { storageService, utilsService } from '../services';

export class RepairCardController {
  host;

  constructor(host) {
    this.host = host;
    host.addController(this);
  }

  fieldsAreVerified() {
    const { repair } = this.host;
    return (repair.basics.name !== '' || repair.basics.emailadres !== ''
        || repair.basics.phonenumber !== '' || repair.timeIndication !== 0
        || repair.description !== '');
  }

  addRepairCard() {
    if (this.fieldsAreVerified()) {
      storageService.setRepairInLocalStorage(this.host.repair);
      window.location.assign('../../index.html');
    } else {
      alert('Nog niet alle velden zijn ingevuld!');
    }
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
    if (this.fieldsAreVerified()) {
      window.print();
    } else {
      alert('Nog niet alle velden zijn ingevuld!');
    }
  }
}
