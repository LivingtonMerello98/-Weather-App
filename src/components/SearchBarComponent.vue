<script>
//componente barra di ricerca
//destrutturazione di store dal file store
import { store } from '../store';

export default {
  name:'SearchBarComponent',
  data() {
    return {
      cityName: localStorage.getItem('cityName') || '', 
    };
  },
  methods: {

    async fetchWeather() {
        // Controlla che il nome della città non sia vuoto (rimuovendo spazi inutili con trim())
        if (this.cityName.trim()) {
            // Chiama l'azione fetchWeatherData dello store, passando il nome della città
            await store.actions.fetchWeatherData(this.cityName);

            // Salva il nome della città nel localStorage per persistenza
            localStorage.setItem('cityName', this.cityName);

            // Aggiorna lo stato del nome della città nello store
            store.mutations.SET_CITY_NAME(this.cityName);
        }
    },

    // Metodo per ottenere le previsioni meteo in base alla posizione corrente dell'utente
    async fetchWeatherByCurrentLocation() {
        // Verifica se il browser supporta la geolocalizzazione
        if (navigator.geolocation) {

            // Se è presente un nome di città attualmente salvato, lo resetta
            if (this.cityName.trim()) {
                this.cityName = ''; // Svuota il campo del nome della città
                store.mutations.SET_CITY_NAME(''); // Aggiorna lo stato dello store
                localStorage.removeItem('cityName'); // Rimuove il nome della città dal localStorage
            }

            // Recupera la posizione corrente dell'utente
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    // estrae latitudine e longitudine dalla posizione corrente usando la destrutturazione
                    const { latitude, longitude } = position.coords;

                    // Aggiorna lo stato con "Your location" chiamando il mutations.set_city_name
                    store.mutations.SET_CITY_NAME('Your location');
                    localStorage.setItem('cityName', 'Your location');

                    //Chiama l'action.fetchWeatherByLocation per ottenere i dati meteo dalla posizione
                    await store.actions.fetchWeatherByLocation(latitude, longitude);
                },
                (error) => {
                    // Gestisce errori di geolocalizzazione 
                    console.error("Geolocation error:", error);
                    store.mutations.SET_ERROR("Unable to access your location.");
                }
            );

        } else {
            // Mostra un messaggio di errore se la geolocalizzazione non è supportata dal browser
            store.mutations.SET_ERROR("Geolocation is not supported by this browser.");
        }
    },

    // Metodo per aprire o chiudere il menu (chiama una mutazione nello store)
    toggleMenu() {
        store.mutations.TOGGLE_MENU();
    }
}

};
</script>

<template>
  <div class="flex items-center justify-between mb-6 space-y-2" >

    <!-- input con v-model su cityName -->
    <!--chiama il metodo fetchweather-->
    <input
      v-model="cityName"
      class="w-full max-w-md px-4 py-2 text-sm text-white rounded-lg border border-gray-600 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      @keyup.enter="fetchWeather"
      placeholder="Enter city name"
    />

    <div class="flex justify-end mb-2">

      <!--chiama il metodo  fetchWeatherByCurrentLocation per la posizione attuale-->
      <button
        @click="fetchWeatherByCurrentLocation"
        class="px-4 py-2 text-sm text-white bg-grey-900 rounded-lg mx-1 flex items-center"
      >
        <font-awesome-icon :icon="['fas', 'map-marker-alt']" class="text-white"/> 
      </button>

      <button
        @click.stop="toggleMenu"
        class="px-4 py-2 text-sm text-white rounded-lg flex items-center"
      >
        <font-awesome-icon icon="bars" />
      </button>
    </div>
  </div>
</template>