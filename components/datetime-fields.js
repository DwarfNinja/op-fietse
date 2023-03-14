import { LitElement, html, css } from 'lit';

export class dateTimeFields extends LitElement {
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
      date: {},
      time: {},
    };
  }

  updated(_changedProperties) {
    super.updated(_changedProperties);
    this.date = new Date().toLocaleDateString().toString().replaceAll('/', '-');
    this.setTime();
  }

  setTime() {
    this.time = new Date().toLocaleTimeString().substring(0, 5);
    setTimeout(() => this.setTime(), 60000);
  }

  render() {
    return html`
            <div class="input-container">
                <label for="current-date">Huidige Datum:</label>
                <input type="text" id="current-date" value="${this.date}" disabled>
            </div>
            <div class="input-container">
                <label for="current-time">Huidige Tijd:</label>
                <input type="text" id="current-time" value="${this.time}" disabled>
            </div>
        `;
  }
}

customElements.define('datetime-fields', dateTimeFields);
