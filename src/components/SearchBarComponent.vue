<script>
import { store } from '../store';

export default {
  data() {
    return {
      cityName: '' // Variabile per memorizzare il nome della città
    };
  },
  methods: {
    async fetchWeather() {
      if (this.cityName.trim()) { // Verifica che il nome della città non sia vuoto
        await store.actions.fetchWeatherData(this.cityName); // Chiamata diretta all'azione
      }
    }
  }
};
</script>

<template>
  <div class="flex justify-center mb-6">
    <input
      v-model="cityName"  
      class="w-full max-w-md px-4 py-2 text-sm text-white rounded-lg border border-gray-600 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 "
      @keyup.enter="fetchWeather" 
      placeholder="Enter city name"
    />
  </div>
</template>
