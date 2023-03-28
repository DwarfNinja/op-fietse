import { css, html, LitElement } from 'lit';

import { StorageService } from '../services/storage-service';
import '../components/user-input-basics';
import '../components/datetime-fields';
import '../components/task-description';
import {storageService} from "../services";

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

      #button-container {
        position:absolute;
        display: flex;
        flex-direction: column;
        top:0;
        right:0;
      }

      button {
        margin: 2rem;
        padding: 1rem 2rem;
      }

      .write-box {
        width: 500px;
        height: 300px;
        border: 1px solid black;
      }
    `;
  }

  static get properties() {
    return {
      repair: {
        basics: Object,
        datetime: Object,
        description: String,
      },
    };
  }

  constructor() {
    super();
    this.repair = {
      id: this.getNewId(),
      basics: {
        name: '',
        emailadres: '',
        phonenumber: '',
      },
      datetime: {
        date: '',
        time: '',
      },
      description: '',
      status: 'Te Doen',
    };
  }

  addRepairCard() {
    storageService.setRepairInLocalStorage(this.repair);
    window.location.assign('../../index.html');
  }

  getNewId() {
    const ids = [];
    const repairList = storageService.getRepairsFromLocalStorage();
    repairList.forEach((repair) => {
      ids.push(repair.id);
    });
    return this.generateRandom(0, 999, ids);
  }

  generateRandom(min, max, except) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return except.includes(num) ? this.generateRandom(min, max) : num;
  }

  printRepairCard() {
    window.print();
  }

  render() {
    return html`
      <div id="button-container">
        <button @click="${() => window.location.assign('../../index.html')}">Dashboard</button>
        <button @click="${this.addRepairCard}">Toevoegen</button>
        <button @click="${(this.printRepairCard)}">Afdrukken</button>
      </div>
      <div id="center-container">
        <h1>Incheck Reparatie ID ${this.repair.id}</h1>
        <form id="repairCardForm">
          <user-input-basics @user-input-basics-changed="${(event) => { this.repair.basics = event.detail; }}"></user-input-basics>
          <datetime-fields @date-time-changed="${(event) => { this.repair.datetime = event.detail; }}"></datetime-fields>
          <task-description @user-input-basics-changed="${(event) => { this.repair.description = event.detail; }}"></task-description>
        </form>
        <h1>Uitvoering Reparatie</h1>
        <div class="write-box"></div>
        <h1>Afronding Reparatie</h1>
        <div class="write-box"></div>
      </div>
    `;
  }
}

customElements.define('repair-card', repairCard);
