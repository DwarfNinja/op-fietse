import { LitElement, html, css } from 'lit';
import { storageService } from '../services';

export class TimeIndication extends LitElement {
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
      timeIndication: Number,
    };
  }

  constructor() {
    super();
    this.setTimeIndication();
  }

  setTimeIndication() {
    if (storageService.tempRepairExists()) {
      const tempRepair = storageService.getTempRepair();
      this.timeIndication = tempRepair.timeIndication;
      return;
    }
    this.timeIndication = 0;
  }

  onInput() {
    this.dispatchEvent(
      new CustomEvent('time-indication-changed', {
        detail: this.timeIndication,
      }),
    );
  }

  render() {
    return html`
      <div class="input-container">
        <label aria-label="time-indication" for="time-indication-input-field">Tijds Indicatie In Minuten:</label>
        <input id="time-indication-input-field" class="input-field" placeholder="Tijds Indicatie In Minuten" type="number" pattern="[0-9]*" value="${this.timeIndication}" required @input="${(event) => { this.timeIndication = event.target.value; this.onInput(event); }}">
      </div>
    `;
  }
}

customElements.define('time-indication', TimeIndication);
