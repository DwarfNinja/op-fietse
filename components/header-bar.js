import { LitElement, html, css } from 'lit';
import { storageService, utilsService } from '../services';

export class HeaderBar extends LitElement {
  static get styles() {
    return css`
      h1 {
        font-size: 24px;
      }
      h2 {
        font-size: 20px;
      }
      #header-bar {
        display: flex; 
        justify-content: center; 
        width: 100%; 
        position: fixed;
        background-color: royalblue; 
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
    this.setTotalRepairTime();
  }

  setTotalRepairTime() {
    let minutes = 0;
    this.repairList.forEach((repair) => { minutes += parseInt(repair.timeIndication, 10); });
    this.totalTimeIndication = utilsService.convertMinutesToTime(minutes);
  }

  render() {
    return html`
            <div id="header-bar">
                <div>
                    <h1 style="color: white;">Totale tijdsindicatie reparaties:</h1>
                    <h2 class="header-menu-item" style="margin: 2rem auto; padding: 0.5rem; justify-self: center; color: black; background-color: white; max-width: 5rem; border-radius: 20px; text-align: center;">${this.totalTimeIndication}</h2>
                </div>
            </div>
    `;
  }
}

customElements.define('header-bar', HeaderBar);
