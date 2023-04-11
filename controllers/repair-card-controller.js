import { Router } from '@vaadin/router';
import { utilsService } from '../services';
import { setRepairInRepairList, store } from '../redux/store';

export class RepairCardController {
  host;

  constructor(host) {
    this.host = host;
    host.addController(this);
  }

  verifyFields() {
    const { repair } = this.host;
    if (Number.isNaN(repair.basics.phonenumber)) {
      alert('Het telefoon nummer is geen geldig nummer!');
      return false;
    }
    if (Number.isNaN(repair.timeIndication)) {
      alert('De tijds indicatie is geen geldige tijd in minuten!');
      return false;
    }
    if (repair.basics.name !== '' || repair.basics.emailadres !== ''
        || repair.basics.phonenumber !== '' || repair.timeIndication !== 0
        || repair.description !== '') {
      return true;
    }
    alert('Nog niet alle velden zijn ingevuld!');
    return false;
  }

  addRepairCard() {
    if (this.verifyFields()) {
      store.dispatch(setRepairInRepairList(this.host.repair));
      Router.go('/');
    }
  }

  getNewId() {
    const ids = [];
    const repairList = store.getState().repairList.value;
    repairList.forEach((repair) => {
      ids.push(repair.id);
    });
    return utilsService.generateRandom(0, 999, ids);
  }

  printRepairCard() {
    if (this.verifyFields()) {
      window.print();
    }
  }
}
