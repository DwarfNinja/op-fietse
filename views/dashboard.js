import {
  css, html, LitElement, nothing,
} from 'lit';
import { DashboardController } from '../controllers/dashboard-controller';

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

  dashboardController = new DashboardController(this);

  static get properties() {
    return {
      repairList: [],
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.dashboardController.updateRepairList();
  }

  render() {
    return html`
      <div id="center-container">
        <div style="max-width: min-content">
          <div style="margin-bottom: 2.5rem">
            <input style="float: left" type="text" id="search-input" aria-label="tabel filter textveld" @input=${(event) => this.dashboardController.searchFilterTable(event)} placeholder="Zoeken">
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
            <tbody class="product-table-body" aria-label="product tabel body">
            ${this.repairList ? this.dashboardController.getFilteredTable(this.dashboardController.Status.TeDoen).map((repair) => html`
              <tr>
                <td aria-label="product id ${repair.id}">${repair.id}</td>
                <td aria-label="product naam ${repair.basics.name}">${repair.basics.name}</td>
                <td aria-label="product datum ${repair.datetime.date}">${repair.datetime.date}</td>
                <td aria-label="product tijd ${repair.datetime.time}">${repair.datetime.time}</td>
                <td aria-label="product status ${repair.status}">${repair.status}</td>
                ${this.dashboardController.getButton(repair)}
              </tr>
            `) : nothing}
            </tbody>
            <tr class="group-label"><th colspan="6">In Behandeling</th></tr>
            <tbody class="product-table-body" aria-label="product tabel body">
            ${this.repairList ? this.dashboardController.getFilteredTable(this.dashboardController.Status.InBehandeling).map((repair) => html`
              <tr>
                <td aria-label="product id ${repair.id}">${repair.id}</td>
                <td aria-label="product naam ${repair.basics.name}">${repair.basics.name}</td>
                <td aria-label="product datum ${repair.datetime.date}">${repair.datetime.date}</td>
                <td aria-label="product tijd ${repair.datetime.time}">${repair.datetime.time}</td>
                <td aria-label="product status ${repair.status}">${repair.status}</td>
                ${this.dashboardController.getButton(repair)}
              </tr>
            `) : nothing}
            </tbody>
            <tr class="group-label"><th colspan="6">Voltooid</th></tr>
            <tbody class="product-table-body" aria-label="product tabel body">
            ${this.repairList ? this.dashboardController.getFilteredTable(this.dashboardController.Status.Voltooid).map((repair) => html`
              <tr>
                <td aria-label="product id ${repair.id}">${repair.id}</td>
                <td aria-label="product naam ${repair.basics.name}">${repair.basics.name}</td>
                <td aria-label="product datum ${repair.datetime.date}">${repair.datetime.date}</td>
                <td aria-label="product tijd ${repair.datetime.time}">${repair.datetime.time}</td>
                <td aria-label="product status ${repair.status}">${repair.status}</td>
                ${this.dashboardController.getButton(repair)}
              </tr>
            `) : nothing}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}

window.customElements.define('dashboard-view', Dashboard);
