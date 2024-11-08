import { createApp } from 'vue';
import './style.scss';
import App from './App.vue';

// tailwind
import './tailwind.css';


// fontawesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

//importare l'icona
import { } from '@fortawesome/free-solid-svg-icons';

// Aggiungi le icone alla libreria
library.add();

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon); // Registrazione globale del componente FontAwesome
app.mount('#app');
