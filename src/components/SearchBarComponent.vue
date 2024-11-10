<script>
import { store } from '../store';

export default {
  data() {
    return {
      cityName: localStorage.getItem('cityName') || '',  // Recupera il nome della città dal localStorage (se presente)
    };
  },
  methods: {
    async fetchWeather() {
      // Verifica che il nome della città non sia vuoto
      if (this.cityName.trim()) {
        // Effettua la chiamata per ottenere i dati meteo
        await store.actions.fetchWeatherData(this.cityName);
        // Salva la città nel localStorage e nello stato
        localStorage.setItem('cityName', this.cityName);
        store.mutations.SET_CITY_NAME(this.cityName);
      }
    }
  }
};
</script>

<template>
  <div class="flex justify-center mb-6">
    <input
      v-model="cityName"  
      class="w-full max-w-md px-4 py-2 text-sm text-white rounded-lg border border-gray-600 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      @keyup.enter="fetchWeather" 
      placeholder="Enter city name"
    />
  </div>
</template>

