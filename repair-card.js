import { LitElement, html, css } from 'lit';

export class repairCard extends LitElement{

    static get styles(){
        return css`
          #center-container {
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            border: none;
            min-height: 100vh;
          }
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

    static get properties() {
        return {
            date: {},
            time: {}
        };
    }

    updated(_changedProperties) {
        super.updated(_changedProperties)
        this.date = new Date().toLocaleDateString().toString().replaceAll("/", "-");
        this.setTime();
    }

    setTime() {
        this.time = new Date().toLocaleTimeString().substring(0, 5);
        setTimeout(()=> this.setTime(), 60000);
    }

    render() {
        return html`
            <div id="center-container">
                <form id="repairCardForm">
                    <div class="input-container">
                        <label aria-label="username-input">Naam:</label>
                        <input class="input-field" placeholder="Naam" required>
                    </div>
                    <div class="input-container">
                        <label aria-label="email-address-input">Emailadres:</label>
                        <input class="input-field" placeholder="Emailadres" required>
                    </div>
                    <div class="input-container">
                        <label aria-label="phone-input">Telefoon Nummer:</label>
                        <input class="input-field" placeholder="Telefoon Nummer" required>
                    </div>
                    <div class="input-container">
                        <label for="current-date">Huidige Datum:</label>
                        <input type="text" id="current-date" value="${this.date}" disabled>
                    </div>
                    <div class="input-container">
                        <label for="current-time">Huidige Tijd:</label>
                        <input type="text" id="current-time" value="${this.time}" disabled>
                    </div>
                    <div class="input-container">
                        <label>Opdracht Omschrijving:</label>
                        <textarea id="description" placeholder="Opdracht Omschrijving" rows="4" cols="40"></textarea>
                    </div>
                    <div id="button-container">
                        <button type="submit">Opslaan</button>
                    </div>
                </form>
            </div>
        `;
    }
}

customElements.define('repair-card', repairCard );
