import { css, html, LitElement } from 'lit';

import '../components/user-input-basics';
import '../components/datetime-fields';
import '../components/task-description';
import '../components/time-indication';
import { RepairCardController } from '../controllers/repair-card-controller';

class repairCard extends LitElement {
  static get styles() {
    return css`
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

  static get properties() {
    return {
      repair: {
        basics: Object,
        datetimecreated: Object,
        description: String,
        timeIndication: Number,
        status: String,
      },
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
      status: 'Te Doen',
    };

    window.addEventListener('afterprint', () => {
      this.printing = false;
    });
  }

  render() {
    return html`
      <div id="center-container">
        <h1>Incheck Reparatie ID ${this.repair.id}</h1>
        <form id="repairCardForm">
          <user-input-basics @user-input-basics-changed="${(event) => { this.repair.basics = event.detail; }}"></user-input-basics>
          <datetime-fields @datetime-created-changed="${(event) => { this.repair.datetimecreated = event.detail; }}"></datetime-fields>
          <time-indication @time-indication-changed="${(event) => { this.repair.timeIndication = event.detail; }}"></time-indication>
          <task-description @user-input-basics-changed="${(event) => { this.repair.description = event.detail; }}"></task-description>
        </form>
        <div id="button-container" class="hide-on-print">
          <button @click="${() => window.location.assign('../../index.html')}">Dashboard</button>
          <button @click="${() => this.repairCardController.addRepairCard()}">Toevoegen</button>
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

customElements.define('repair-card', repairCard);
