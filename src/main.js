// main.js (o main.ts)

import { createApp } from 'vue';
import './style.scss';
import App from './App.vue';

// Tailwind
import './tailwind.css';

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


import { faLocationArrow, faBars, faPlus, faTrash, faCheck, faStar, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

library.add(faLocationArrow, faBars, faPlus, faTrash, faCheck, faStar, faMapMarkerAlt);

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
