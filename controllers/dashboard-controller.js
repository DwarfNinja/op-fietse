import { html } from 'lit';
import { storageService } from '../services';

export class DashboardController {
  host;

  Status = {
    TeDoen: 'Te Doen',
    InBehandeling: 'In Behandeling',
    Voltooid: 'Voltooid',
    Betaald: 'Betaald',
  };

  constructor(host) {
    this.host = host;
    host.addController(this);
  }

  changeRepairStatus(repair, status) {
    const changedRepair = repair;
    changedRepair.status = status;
    switch (status) {
      case this.Status.InBehandeling:
        changedRepair.datetimestarted = {
          date: new Date().toLocaleDateString().toString().replaceAll('/', '-'), time: new Date().toLocaleTimeString().substring(0, 5),
        };
        break;
      case this.Status.Voltooid:
        changedRepair.datetimecompleted = {
          date: new Date().toLocaleDateString().toString().replaceAll('/', '-'), time: new Date().toLocaleTimeString().substring(0, 5),
        };
        break;
      default:
        break;
    }
    storageService.replaceRepair(repair);
    this.updateRepairList();
  }

  finishRepair(repair) {
    storageService.deleteRepairInLocalStorage(repair);
    this.updateRepairList();
  }

  updateRepairList() {
    this.host.repairList = storageService.getRepairsFromLocalStorage()
      .sort((a, b) => a.id > b.id);
  }

  getButton(repair) {
    switch (repair.status) {
      case this.Status.InBehandeling:
        return html`<td><button @click="${() => this.changeRepairStatus(repair, this.Status.Voltooid)}" style="width: 6rem">Voltooi</button></td>`;
      case this.Status.Voltooid:
        return html`<td><button @click="${() => this.finishRepair(repair)}" style="width: 6rem">Betaald</button></td>`;
      default:
        return html`<td><button @click="${() => this.changeRepairStatus(repair, this.Status.InBehandeling)}" style="width: 6rem">Start</button></td>`;
    }
  }

  getFilteredTable(filter) {
    return this.host.repairList.filter((repair) => repair.status === filter);
  }

  searchFilterTable(event) {
    const filter = event.target.value.toUpperCase();
    const tables = this.host.shadowRoot.querySelectorAll('.product-table-body');

    tables.forEach((table) => {
      const tr = table.getElementsByTagName('tr');
      let found;

      for (let i = 0; i < tr.length; i++) {
        const td = tr[i].getElementsByTagName('td');
        for (let j = 0; j < td.length; j++) {
          const txtValue = td[j].textContent || td[j].innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            found = true;
          }
        }
        if (found) {
          tr[i].style.display = '';
          found = false;
        } else {
          tr[i].style.display = 'none';
        }
      }
    });
  }
}
