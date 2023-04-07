import { LitElement, html, css } from 'lit';
import { storageService, utilsService } from '../services';

export class HeaderBar extends LitElement {
  static get styles() {
    return css`
      #header-bar {
        display: flex; 
        justify-content: center; 
        width: 100%; 
        position: fixed; 
        background-color: cornflowerblue; 
        font-family: sans-serif;
      }
    `;
  }

  static get properties() {
    return {
      repairList: [],
      totalTimeIndication: 0,
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.repairList = storageService.getRepairsFromLocalStorage();
    let minutes = 0;
    this.repairList.forEach((repair) => { minutes += parseInt(repair.timeIndication, 10); });
    this.totalTimeIndication = utilsService.convertMinutesToTime(minutes);
  }

  render() {
    return html`
            <div id="header-bar">
                <div>
                    <h3>Totale tijdsindicatie reparaties:</h3>
                    <h3 class="header-menu-item" style="margin: 2rem auto; padding: 0.5rem; justify-self: center; background-color: white; max-width: 5rem; border-radius: 20px; text-align: center;">${this.totalTimeIndication}</h3>
                </div>
            </div>
    `;
  }
}

customElements.define('header-bar', HeaderBar);
