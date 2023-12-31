import { LitElement, html, css } from 'lit';
import { storageService } from '../services';

export class UserInputBasics extends LitElement {
  static get styles() {
    return css`
      .input-container {
        display: flex;
        flex-direction: column;
        padding: 0.5rem;
      }

      label {
        padding: 0.1rem;
      }
    `;
  }

  static get properties() {
    return {
      name: String,
      emailadres: String,
      phonenumber: String,
    };
  }

  constructor() {
    super();
    this.setUserBasics();
  }

  setUserBasics() {
    if (storageService.tempRepairExists()) {
      const tempRepair = storageService.getTempRepair();
      this.name = tempRepair.basics.name;
      this.emailadres = tempRepair.basics.emailadres;
      this.phonenumber = tempRepair.basics.phonenumber;
      return;
    }
    this.name = '';
    this.emailadres = '';
    this.phonenumber = '';
  }

  onInput() {
    this.dispatchEvent(new CustomEvent('user-input-basics-changed', {
      detail: { name: this.name, emailadres: this.emailadres, phonenumber: this.phonenumber },
    }));
  }

  render() {
    return html`
      <div class="input-container">
        <label aria-label="username-input" for="name-input-field">Naam:</label>
        <input id="name-input-field" class="input-field" placeholder="Naam" value="${this.name}" required @input="${(event) => { this.name = event.target.value; this.onInput(event); }}">
      </div>
      <div class="input-container">
        <label aria-label="email-address-input" for="emailadress-input-field">Emailadres:</label>
        <input id="emailadress-input-field" class="input-field" placeholder="Emailadres" value="${this.emailadres}" required @input="${(event) => { this.emailadres = event.target.value; this.onInput(event); }}">
      </div>
      <div class="input-container">
        <label aria-label="phone-input" for="phonenumber-input-field">Telefoon Nummer:</label>
        <input id="phonenumber-input-field" class="input-field" placeholder="Telefoon Nummer" value="${this.phonenumber}" required @input="${(event) => { this.phonenumber = event.target.value; this.onInput(event); }}">
      </div>
    `;
  }
}

customElements.define('user-input-basics', UserInputBasics);
