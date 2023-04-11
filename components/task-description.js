import { LitElement, html, css } from 'lit';
import { storageService } from '../services';

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
    if (this.repairOpened()) {
      return;
    }
    this.description = '';
  }

  repairOpened() {
    if (storageService.getTempRepair() !== null) {
      const tempRepair = storageService.getTempRepair();
      this.description = tempRepair.description;
      return true;
    }
    return false;
  }

  onInput() {
    this.dispatchEvent(new CustomEvent('description-changed', {
      detail: this.description,
    }));
  }

  render() {
    return html`
      <div class="input-container">
        <label for="description">Opdracht Beschrijving:</label>
        <textarea id="description" placeholder="Opdracht Beschrijving" rows="4" cols="40" @input="${(event) => { this.description = event.target.value; this.onInput(event); }}">${this.description}</textarea>
      </div>
    `;
  }
}

customElements.define('task-description', TaskDescription);
