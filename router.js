import { Router } from '@vaadin/router';
import './views/repair-card';

const router = new Router(document.getElementById('outlet'));
router.setRoutes([
  { path: '/', component: 'my-app' },
  { path: '/repaircard', component: 'repair-card' },
]);
