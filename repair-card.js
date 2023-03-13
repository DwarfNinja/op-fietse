import { LitElement, html, css } from 'lit';

export class repairCard extends LitElement{

    static get styles(){
        return css`
        `;
    }

    constructor(){
        super();
    }

    render() {
        return html`
            <div>
                Hello World!
            </div>
            `;
        }
}

customElements.define('repair-card', repairCard );
