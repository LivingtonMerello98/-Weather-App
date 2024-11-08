<script>
import axios from 'axios';
import { store } from '../store';

export default {
  data() {
    return {
      name: 'SearchBarComponent',
      cityName: '', // var stringa vuota inizializzata
    };
  },
  methods: {
    
    async fetchWeather() {
        
    // controlla se è stata inserita una città
    if (!this.cityName) return;

        try {
            // si effettua la chiamata api passando come parametro il nome della città
            const geoResponse = await axios.get(`${store.geocodeUrl}&q=${this.cityName}&limit=1`);

            //se i data di geoResponse sono vuoti si lancia errore
            if (geoResponse.data.length === 0) {
                console.error('Città non trovata');
                return;
            }

            //destrutturazione di lat e lon da geoResponse.data
            const { lat, lon } = geoResponse.data[0]; // Estrae latitudine e longitudine

            // costruzione url completo con i parametri dinamici
            const weatherUrl = `${store.apiUrl}?lat=${lat}&lon=${lon}&appid=d50e0df379951e670d50879fd359b86f`;

            // chiamata axios all'url completo
            const weatherResponse = await axios.get(weatherUrl);

            //log della risposta
            console.log('Dati meteo:', weatherResponse.data);

        } catch (error) {
            console.error('Errore durante la richiesta meteo:', error);
        }

    },
  },
};
</script>

<template>
  <div class="max-w-lg py-3">
    <input
      v-model="cityName"
      @keyup.enter="fetchWeather" 
      type="text"
      class="px-3 py-1 border border-gray-200 rounded-md text-sm text-gray-700 focus:ring-2 focus:ring-gray-500 focus:outline-none transition duration-200"
      aria-label="Search input"
      placeholder="Cerca città..."
    />
  </div>
</template>

<style lang="scss" scoped>

</style>
