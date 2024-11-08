<script>
import { store } from '../store';

export default {
  data() {
    return {
      cityName: '',
    };
  },
  methods: {
    fetchWeather() {
      if (!this.cityName) return;
      store.actions.fetchWeatherData(this.cityName);
    },
  },
};
</script>

<template>
  <div class="search-bar">
    <input
      class="px-3 py-1 border border-gray-200 rounded-md text-sm text-gray-700 focus:ring-2 focus:ring-gray-500 focus:outline-none transition duration-200"
      v-model="cityName"
      @keyup.enter="fetchWeather"
      placeholder="Enter city name"
    />
  </div>
</template>
