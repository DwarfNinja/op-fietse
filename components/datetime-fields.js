import { LitElement, html, css } from 'lit';
import { DateTimeController } from '../controllers/datetime-controller';

export class DateTimeFields extends LitElement {
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

  datetimeController = new DateTimeController(this);

  static get properties() {
    return {
      date: String,
      time: String,
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.datetimeController.setDateTime();
  }

  render() {
    return html`
      <div class="input-container">
        <label for="current-date">Huidige Datum:</label>
        <input type="text" id="current-date" value="${this.date}" disabled">
      </div>
      <div class="input-container">
        <label for="current-time">Huidige Tijd:</label>
        <input type="text" id="current-time" value="${this.time}" disabled">
      </div>
    `;
  }
}

customElements.define('datetime-fields', DateTimeFields);
