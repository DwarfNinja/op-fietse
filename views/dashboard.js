import {
  css, html, LitElement, nothing,
} from 'lit';
import { Router } from '@vaadin/router';
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
            border: 2px solid royalblue;
            border-radius: 10px;
          }

          button {
            font-size: 14px;
            margin: 0 0.5rem;
            padding: 0.5rem;
            color: white;
            background-color: royalblue;
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
            background: royalblue;
            color: white;
          }

          #repair-table {
            border-collapse: collapse;
            margin: 25px 0;
            font-size: 0.9em;
            font-family: sans-serif;
            min-width: 55rem;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
          }

          #repair-table thead tr {
            background-color: royalblue;
            color: white;
            text-align: left;
            border-bottom: 3px solid mediumblue;
          }

          #repair-table th,
          #repair-table td {
            text-align: center;
            width: 7rem;
            padding: 12px 15px;
          }

          #repair-table tbody tr {
            border-bottom: 1px solid #dddddd;
          }

          #repair-table tbody tr:nth-of-type(even) {
            background-color: #d6e3fd;
          }

          #repair-table tbody tr:last-of-type {
            border-bottom: 2px solid royalblue;
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
                <div style="margin-bottom: 3.5rem">
                    <input style="float: left" type="text" id="search-input" aria-label="tabel filter textveld" @input=${(event) => this.dashboardController.searchFilterTable(event)} placeholder="Zoeken">
                    <button style="float: right" aria-label="reparatiekaart aanmaken" @click="${() => Router.go('/repaircard')}">Reparatiekaart Aanmaken</button>
                </div>
                <table id="repair-table" aria-label="repair tabel">
                    <thead>
                    <tr>
                        <th aria-label="kopstuk id">ID</th>
                        <th aria-label="kopstuk datum tijd aangemaakt">Datum/Tijd Aangemaakt</th>
                        <th aria-label="kopstuk datum tijd gestart">Datum/Tijd Gestart</th>
                        <th aria-label="kopstuk datum tijd voltooid">Datum/Tijd Voltooid</th>
                        <th aria-label="kopstuk tijds indicatie">Tijds Indicatie</th>
                        <th aria-label="kopstuk status">Status</th>
                        <th aria-label="kopstuk actie">Inzien</th>
                        <th aria-label="kopstuk actie">Status Actie</th>
                    </tr>
                    </thead>
                    <tr class="group-label"><th colspan="8">Te Doen</th></tr>
                    <tbody class="repair-table-body" aria-label="repair tabel body">
                    ${this.repairList ? this.dashboardController.getFilteredTable(this.dashboardController.Status.TeDoen).map((repair) => html`
                        <tr>
                            <td aria-label="id ${repair.id}">${repair.id}</td>
                            <td aria-label="datum aangemaakt">${repair.datetimecreated.date} ${repair.datetimecreated.time}</td>
                            <td aria-label="datum gestart">${repair.datetimestarted.date} ${repair.datetimestarted.time}</td>
                            <td aria-label="datum voltooid">${repair.datetimecompleted.date} ${repair.datetimecompleted.time}</td>
                            <td aria-label="tijds indicatie">${repair.timeIndication}min</td>
                            <td aria-label="status ${repair.status}">${repair.status}</td>
                            <td><button @click="${() => this.dashboardController.openRepairCard(repair)}" style="width: 6rem">Open</button></td>
                            ${this.dashboardController.getButton(repair)}
                        </tr>
                    `) : nothing}
                    </tbody>
                    <tr class="group-label"><th colspan="8">In Behandeling</th></tr>
                    <tbody class="repair-table-body" aria-label="repair tabel body">
                    ${this.repairList ? this.dashboardController.getFilteredTable(this.dashboardController.Status.InBehandeling).map((repair) => html`
                        <tr>
                            <td aria-label="id ${repair.id}">${repair.id}</td>
                            <td aria-label="datum aangemaakt">${repair.datetimecreated.date} ${repair.datetimecreated.time}</td>
                            <td aria-label="datum gestart">${repair.datetimestarted.date} ${repair.datetimestarted.time}</td>
                            <td aria-label="datum voltooid">${repair.datetimecompleted.date} ${repair.datetimecompleted.time}</td>
                            <td aria-label="tijds indicatie">${repair.timeIndication}min</td>
                            <td aria-label="status ${repair.status}">${repair.status}</td>
                            <td><button @click="${() => this.dashboardController.openRepairCard(repair)}" style="width: 6rem">Open</button></td>
                            ${this.dashboardController.getButton(repair)}
                        </tr>
                    `) : nothing}
                    </tbody>
                    <tr class="group-label"><th colspan="8">Voltooid</th></tr>
                    <tbody class="repair-table-body" aria-label="repair tabel body">
                    ${this.repairList ? this.dashboardController.getFilteredTable(this.dashboardController.Status.Voltooid).map((repair) => html`
                        <tr>
                            <td aria-label="id ${repair.id}">${repair.id}</td>
                            <td aria-label="datum aangemaakt">${repair.datetimecreated.date} ${repair.datetimecreated.time}</td>
                            <td aria-label="datum gestart">${repair.datetimestarted.date} ${repair.datetimestarted.time}</td>
                            <td aria-label="datum voltooid">${repair.datetimecompleted.date} ${repair.datetimecompleted.time}</td>
                            <td aria-label="tijds indicatie">${repair.timeIndication}min</td>
                            <td aria-label="status ${repair.status}">${repair.status}</td>
                            <td><button @click="${() => this.dashboardController.openRepairCard(repair)}" style="width: 6rem">Open</button></td>
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
