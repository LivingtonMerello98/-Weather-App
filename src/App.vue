<script>
import { store } from './store';
import SearchBarComponent from './components/SearchBarComponent.vue';
import CurrentWeather from './components/CurrentWeather.vue';
import DailyForecast from './components/DailyForecast.vue';
import HourlyForecast from './components/HourlyForecast.vue';

export default {
  components: {
    SearchBarComponent,
    CurrentWeather,
    DailyForecast,
    HourlyForecast,
  },
  computed: {
    isLoading() {
      return store.getters.isLoading();
    },
    errorMessage() {
      return store.getters.errorMessage();
    }
  },
};
</script>

<template>
  <section class="bg-gradient-to-b from-gray-700 to-gray-900 text-gray-100 min-h-screen p-8">
    <div class="max-w-4xl mx-auto space-y-8">
      <!-- Search Bar -->
      <SearchBarComponent />

      <!-- Messaggio di errore -->
      <div v-if="errorMessage" class="text-red-500 text-center">
        {{ errorMessage }}
      </div>

      <!-- Indicatore di caricamento -->
      <div v-if="isLoading" class="flex justify-center">
        <p>Loading...</p>
      </div>

      <!-- Current Weather -->
      <div v-if="!isLoading && !errorMessage" class="bg-gray-800 rounded-lg shadow-lg p-6">
        <CurrentWeather />
      </div>

      <!-- Hourly Forecast -->
      <div v-if="!isLoading && !errorMessage" class="bg-gray-800 rounded-lg shadow-lg p-6">
        <HourlyForecast />
      </div>

      <!-- Daily Forecast -->
      <div v-if="!isLoading && !errorMessage" class="bg-gray-800 rounded-lg shadow-lg p-6">
        <DailyForecast />
      </div>
    </div>
  </section>
</template>


<style scoped>
/* Custom styling can be added here if needed */
</style>
