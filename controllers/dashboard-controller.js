import { html } from 'lit';
import { Router } from '@vaadin/router';
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

  openRepairCard(repair) {
    storageService.saveTempRepairLocalStorage(repair);
    Router.go('/repaircard');
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
        return html`<td><button @click="${() => {
          if (confirm('Wilt u een email sturen naar de klant?')) {
            window.open(`mailto:${repair.basics.emailadres}?subject=Info Reparatie: ID-${repair.id}&body=Beste ${repair.basics.name},%0D%0AUw reparatie is voltooid %0D%0ADatum en tijd voltooid: ${repair.datetimecompleted.date.toString()}' '${repair.datetimecompleted.time.toString()} %0D%0ABeschrijving van de uitgevoerde reparatie: ${repair.description}`);
          }
          this.finishRepair(repair);
        }}" style="width: 6rem">Betaald</button></td>`;
      default:
        return html`<td><button @click="${() => this.changeRepairStatus(repair, this.Status.InBehandeling)}" style="width: 6rem">Start</button></td>`;
    }
  }

  getFilteredTable(filter) {
    const { repairList } = this.host;
    if (repairList.length === 0) {
      return repairList;
    }
    return repairList.filter((repair) => repair.status === filter);
  }

  searchFilterTable(event) {
    const filter = event.target.value.toUpperCase();
    const tables = this.host.shadowRoot.querySelectorAll('.repair-table-body');

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
