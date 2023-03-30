import { LitElement, html, css } from 'lit';

class TaskDescription extends LitElement {
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
      description: String,
    };
  }

  constructor() {
    super();
    this.description = '';
  }

  onInput() {
    this.dispatchEvent(new CustomEvent('description-changed', {
      detail: this.description,
    }));
  }

  render() {
    return html`
      <div class="input-container">
        <label>Opdracht Beschrijving:</label>
        <textarea id="description" placeholder="Opdracht Beschrijving" rows="4" cols="40" @input="${(event) => { this.description = event.target.value; this.onInput(event); }}"></textarea>
      </div>
    `;
  }
}

customElements.define('task-description', TaskDescription);
