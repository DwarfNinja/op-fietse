import { LitElement, html, css } from 'lit';
import '/components/user-input-basics.js';
import '/components/datetime-fields.js';
import '/components/task-description.js';

export class repairCard extends LitElement{

    static get styles(){
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
          
          button {
            position:absolute;
            top:0;
            right:0;
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

    constructor(){
        super();
    }

    printRepairCard() {
        window.print();
    }

    render() {
        return html`
            <button @click="${this.printRepairCard}">Afdrukken</button>
            <div id="center-container">
                <h1>Incheck Reperatie</h1>
                <form id="repairCardForm">
                    <user-input-basics></user-input-basics>
                    <datetime-fields></datetime-fields>
                    <task-description></task-description>
                </form>
                <h1>Uitvoering Reperatie</h1>
                <div class="write-box"></div>
                <h1>Afronding Reperatie</h1>
                <div class="write-box"></div>
            </div>
        `;
    }
}

customElements.define('repair-card', repairCard);
