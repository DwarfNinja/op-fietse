import { css, html, LitElement, nothing } from 'lit';

import { storageService } from '../services';

export class Dashboard extends LitElement {
  static get styles() {
    return css`
      #center-container {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        border: none;
        min-height: 100vh;
      }

      #search-input {
        padding: 0.4rem;
        border: 2px solid cornflowerblue;
        border-radius: 10px;
      }

      button {
        font-size: 14px;
        margin: 0 0.5rem;
        padding: 0.5rem;
        color: white;
        background-color: cornflowerblue;
        border: none;
        border-radius: 10px;
        font-weight: bold;
      }

      button:hover {
        scale: 110%;
      }

      button:active {
        scale: 90%;
      }

      .group-label {
        background: cornflowerblue;
        color: white;
      }

      #product-table {
        border-collapse: collapse;
        margin: 25px 0;
        font-size: 0.9em;
        font-family: sans-serif;
        min-width: 35rem;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
      }

      #product-table thead tr {
        background-color: cornflowerblue;
        color: white;
        text-align: left;
        border-bottom: 3px solid royalblue;
      }

      #product-table th,
      #product-table td {
        text-align: center;
        width: 7rem;
        padding: 12px 15px;
      }

      #product-table tbody tr {
        border-bottom: 1px solid #dddddd;
      }

      #product-table tbody tr:nth-of-type(even) {
        background-color: #d6e3fd;
      }

      #product-table tbody tr:last-of-type {
        border-bottom: 2px solid cornflowerblue;
      }
    `;
  }

  Status = {
    TeDoen: 'Te Doen',
    InBehandeling: 'In Behandeling',
    Voltooid: 'Voltooid',
    Betaald: 'Betaald',
  };

  static get properties() {
    return {
      repairList: [],
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.repairList = storageService.getRepairsFromLocalStorage()
      .sort((a, b) => a.id > b.id);
  }

  changeRepairStatus(repair, status) {
    const newRepair = repair;
    newRepair.status = status;
    storageService.replaceRepair(repair);
    this.updateRepairList();
  }

  finishRepair(repair) {
    storageService.deleteRepairInLocalStorage(repair);
    this.updateRepairList();
  }

  updateRepairList() {
    this.repairList = storageService.getRepairsFromLocalStorage()
      .sort((a, b) => a.id > b.id);
    this.requestUpdate();
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
    return this.repairList.filter((repair) => repair.status === filter);
  }

  searchFilterTable(event) {
    const filter = event.target.value.toUpperCase();
    const table = this.shadowRoot.getElementById('product-table-body');
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
  }

  render() {
    return html`
      <div id="center-container">
        <div style="max-width: min-content">
          <div style="margin-bottom: 2.5rem">
            <input style="float: left" type="text" id="search-input" aria-label="tabel filter textveld" @input=${(event) => this.searchFilterTable(event)} placeholder="Zoeken">
            <button aria-label="reparatiekaart aanmaken" @click="${() => window.location.assign('../views/repair-card.html')}">Reparatiekaart Aanmaken</button>
          </div>
          <table id="product-table" aria-label="product tabel">
            <thead>
            <tr>
              <th aria-label="kopstuk id">ID</th>
              <th aria-label="kopstuk naam">Naam</th>
              <th aria-label="kopstuk datum">Datum</th>
              <th aria-label="kopstuk tijd">Tijd</th>
              <th aria-label="kopstuk status">Status</th>
              <th aria-label="kopstuk actie">Actie</th>
            </tr>
            </thead>
            <tr class="group-label"><th colspan="6">Te Doen</th></tr>
            <tbody id="product-table-body" aria-label="product tabel body">
            ${this.repairList ? this.getFilteredTable(this.Status.TeDoen).map((repair) => html`
              <tr>
                <td aria-label="product id ${repair.id}">${repair.id}</td>
                <td aria-label="product naam ${repair.basics.name}">${repair.basics.name}</td>
                <td aria-label="product datum ${repair.datetime.date}">${repair.datetime.date}</td>
                <td aria-label="product tijd ${repair.datetime.time}">${repair.datetime.time}</td>
                <td aria-label="product status ${repair.status}">${repair.status}</td>
                ${this.getButton(repair)}
              </tr>
            `) : nothing}
            </tbody>
            <tr class="group-label"><th colspan="6">In Behandeling</th></tr>
            <tbody id="product-table-body" aria-label="product tabel body">
            ${this.repairList ? this.getFilteredTable(this.Status.InBehandeling).map((repair) => html`
              <tr>
                <td aria-label="product id ${repair.id}">${repair.id}</td>
                <td aria-label="product naam ${repair.basics.name}">${repair.basics.name}</td>
                <td aria-label="product datum ${repair.datetime.date}">${repair.datetime.date}</td>
                <td aria-label="product tijd ${repair.datetime.time}">${repair.datetime.time}</td>
                <td aria-label="product status ${repair.status}">${repair.status}</td>
                ${this.getButton(repair)}
              </tr>
            `) : nothing}
            </tbody>
            <tr class="group-label"><th colspan="6">Voltooid</th></tr>
            ${this.repairList ? this.getFilteredTable(this.Status.Voltooid).map((repair) => html`
              <tr>
                <td aria-label="product id ${repair.id}">${repair.id}</td>
                <td aria-label="product naam ${repair.basics.name}">${repair.basics.name}</td>
                <td aria-label="product datum ${repair.datetime.date}">${repair.datetime.date}</td>
                <td aria-label="product tijd ${repair.datetime.time}">${repair.datetime.time}</td>
                <td aria-label="product status ${repair.status}">${repair.status}</td>
                ${this.getButton(repair)}
              </tr>
            `) : nothing}
          </table>
        </div>
      </div>
    `;
  }
}

window.customElements.define('dashboard-view', Dashboard);
