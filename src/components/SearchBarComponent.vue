<!-- searchBar -->
<script>
import { store } from '../store';

export default {
  data() {
    return {
      cityName: localStorage.getItem('cityName') || '', 
    };
  },
  methods: {
    async fetchWeather() {
      if (this.cityName.trim()) {
        await store.actions.fetchWeatherData(this.cityName);
        localStorage.setItem('cityName', this.cityName);
        store.mutations.SET_CITY_NAME(this.cityName);
      }
    },
    async fetchWeatherByCurrentLocation() {
      if (navigator.geolocation) {
        if (this.cityName.trim()) {
          this.cityName = '';
          store.mutations.SET_CITY_NAME('');
          localStorage.removeItem('cityName');
        }

        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            store.mutations.SET_CITY_NAME('Your location');
            localStorage.setItem('cityName', 'Your location');
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
    },
    toggleMenu() {
      store.mutations.TOGGLE_MENU(); // Attiva/disattiva il menu
    }
  }
};
</script>

<template>
  <div class="flex items-center justify-between mb-6 space-y-2">
    <input
      v-model="cityName"
      class="w-full max-w-md px-4 py-2 text-sm text-white rounded-lg border border-gray-600 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      @keyup.enter="fetchWeather"
      placeholder="Enter city name"
    />

    <div class="flex justify-end mb-2">
      <button
        @click="fetchWeatherByCurrentLocation"
        class="px-4 py-2 text-sm text-white bg-grey-900 rounded-lg mx-1 flex items-center"
      >
        <font-awesome-icon icon="location-arrow"/> 
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