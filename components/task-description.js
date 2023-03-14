import { LitElement, html, css } from 'lit';

export class taskDescription extends LitElement{

    static get styles(){
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

    constructor(){
        super();
    }

    render() {
        return html`
            <div class="input-container">
                <label>Opdracht Beschrijving:</label>
                <textarea id="description" placeholder="Opdracht Beschrijving" rows="4" cols="40"></textarea>
            </div>
        `;
    }
}

customElements.define('task-description', taskDescription);
