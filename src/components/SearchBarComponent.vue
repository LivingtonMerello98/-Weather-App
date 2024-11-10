<script>
import { store } from '../store';

export default {
  data() {
    return {
      cityName: localStorage.getItem('cityName') || '', // Usa il valore dal localStorage se disponibile
    };
  },
  methods: {
    async fetchWeather() {
      if (this.cityName.trim()) {
        await store.actions.fetchWeatherData(this.cityName);
        localStorage.setItem('cityName', this.cityName); // Salva la città nel localStorage
        store.mutations.SET_CITY_NAME(this.cityName);
      }
    },
    async fetchWeatherByCurrentLocation() {
      if (navigator.geolocation) {
        // Se cityName ha già un valore, lo svuotiamo prima di impostare la posizione attuale
        if (this.cityName.trim()) {
          this.cityName = ''; // Svuota cityName
          store.mutations.SET_CITY_NAME(''); // Svuota cityName nello store
          localStorage.removeItem('cityName'); // Opzionale: rimuovi cityName dal localStorage
        }

        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            // Imposta 'Your location' come cityName
            store.mutations.SET_CITY_NAME('Your location');
            localStorage.setItem('cityName', 'Your location'); // Opzionale: aggiorna cityName nel localStorage

            // Ora recupera i dati meteo per la posizione corrente
            await store.actions.fetchWeatherByLocation(latitude, longitude);
          },
          (error) => {
            console.error("Geolocation error:", error);
            store.mutations.SET_ERROR("Unable to access your location.");
          }
        );
      } else {
        store.mutations.SET_ERROR("Geolocation is not supported by this browser.");
      }
    }
  }
};
</script>

<template>
  <div class="flex items-center justify-between mb-6 space-y-2">
    <input
      v-model="cityName"
      class="w-full max-w-md px-4 py-2 text-sm text-white rounded-lg border border-gray-600 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
      @keyup.enter="fetchWeather"
      placeholder="Enter city name"
    />
    <div class="flex justify-end mb-2">
      <!-- Bottone con icona geolocalizzazione -->
      <button
        @click="fetchWeatherByCurrentLocation"
        class="px-4 py-2 text-sm text-white bg-grey-900 rounded-lg mx-1 flex items-center"
      >
        <font-awesome-icon icon="location-arrow"/> 
      </button>

      <button
        @click="toggleMenu"
        class="px-4 py-2 text-sm text-white rounded-lg flex items-center"
      >
        <font-awesome-icon icon="bars" />
      </button>
    </div>
  </div>
</template>

