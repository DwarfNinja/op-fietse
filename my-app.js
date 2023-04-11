import { html, LitElement } from 'lit';
import './components/header-bar';
import './views/dashboard';

export class MyApp extends LitElement {
  render() {
    return html`
      <header-bar></header-bar>
      <dashboard-view></dashboard-view>
    `;
  }
}

window.customElements.define('my-app', MyApp);
