import { LitElement, html, css } from 'lit';

export class userInputBasics extends LitElement{

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
        `;
    }
}

customElements.define('user-input-basics', userInputBasics);
