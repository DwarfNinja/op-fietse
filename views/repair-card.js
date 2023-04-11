import {
  css, html, LitElement, nothing,
} from 'lit';
import '../components/user-input-basics';
import '../components/datetime-fields';
import '../components/task-description';
import '../components/time-indication';
import { Router } from '@vaadin/router';
import { RepairCardController } from '../controllers/repair-card-controller';
import { storageService } from '../services';

export class RepairCard extends LitElement {
  static get styles() {
    return css`
      h2 {
        margin-top: 0;
      }
      
      #center-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        border: none;
        min-height: 100vh;
      }

      button {
        margin: 2rem;
        padding: 1rem 2rem;
      }

      .write-box {
        width: 400px;
        height: 250px;
        border: 1px solid black;
      }

      .show-on-print {
        display: none;
      }
      
      @media print {
        .hide-on-print {
          display: none !important;
        }

        .show-on-print {
          display: block !important;
        }
      }
    `;
  }

  repairCardController = new RepairCardController(this);

  static Status = {
    TeDoen: 'Te Doen',
    InBehandeling: 'In Behandeling',
    Voltooid: 'Voltooid',
    Betaald: 'Betaald',
  };

  static get properties() {
    return {
      repair: {
        basics: Object,
        datetimecreated: Object,
        description: String,
        timeIndication: Number,
        status: String,
      },
      repairOpened: Boolean,
      printing: Boolean,
    };
  }

  constructor() {
    super();
    this.repair = {
      id: this.repairCardController.getNewId(),
      basics: {
        name: '',
        emailadres: '',
        phonenumber: '',
      },
      datetimecreated: {
        date: '',
        time: '',
      },
      datetimestarted: {
        date: '',
        time: '',
      },
      datetimecompleted: {
        date: '',
        time: '',
      },
      description: '',
      timeIndication: 0,
      status: RepairCard.Status.TeDoen,
    };

    this.repairOpened = this.isRepairOpened();

    window.addEventListener('afterprint', () => {
      this.printing = false;
    });
  }

  isRepairOpened() {
    if (storageService.getTempRepairLocalStorage() !== null) {
      this.repair.status = storageService.getTempRepairLocalStorage().status;
      return true;
    }
  }

  render() {
    return html`
      <div id="center-container">
        <h1>Incheck Reparatie | ID: ${this.repair.id}</h1>
        ${this.repairOpened ? html`<h2>Status: ${this.repair.status}</h2>` : nothing}
        <form id="repairCardForm">
          <user-input-basics @user-input-basics-changed="${(event) => { this.repair.basics = event.detail; }}"></user-input-basics>
          <datetime-fields @datetime-created-changed="${(event) => { this.repair.datetimecreated = event.detail; }}"></datetime-fields>
          <time-indication @time-indication-changed="${(event) => { this.repair.timeIndication = event.detail; }}"></time-indication>
          <task-description @description-changed="${(event) => { this.repair.description = event.detail; }}"></task-description>
        </form>
        <div id="button-container" class="hide-on-print">
          ${this.repairOpened
    ? html`<button @click="${() => { storageService.removeTempRepairLocalStorage(); Router.go('/'); }}">Terug</button>`
    : html`<button @click="${() => Router.go('/')}">Dashboard</button>`}
          ${this.repairOpened ? nothing : html`<button @click="${() => this.repairCardController.addRepairCard()}">Toevoegen</button>`}
          <button @click="${() => this.repairCardController.printRepairCard()}">Afdrukken</button>
        </div>
        <div class="show-on-print">
          <h1>Uitvoering Reparatie</h1>
          <div class="write-box"></div>
          <h1>Afronding Reparatie</h1>
          <div class="write-box"></div>
        </div>
      </div>
    `;
  }
}

customElements.define('repair-card', RepairCard);
