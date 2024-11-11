<script>
import { store } from '../store';
export default {
  name: 'DailyForecast',
  computed: {
    dailyWeather() {
      return store.getters.dailyWeather();
    },
    formatDate() {
      return (timestamp) => new Date(timestamp * 1000).toLocaleDateString('en-GB', {
        weekday: 'short',
        day: 'numeric',
      });
    },
  }
}
</script>

<template>
  <div>
    <h3 class="text-m font-semibold mb-5">10 Day Forecast</h3>
    <p v-if="!dailyWeather.length" class="text-blue-500">Daily Forecast not available.</p>

    <div v-else class="forecast-container">
      
      <div v-for="(day, index) in dailyWeather" :key="index" class="bg-gray-900 text-center rounded-lg p-6" style="min-width: 150px;">
        <p class="font-semibold text-xs">{{ formatDate(day.dt) }}</p>
        <img :src="'https://openweathermap.org/img/wn/' + day.weather[0].icon + '@2x.png'" alt="Weather icon" class="mx-auto my-2 w-15 h-15" />
        <p class="text-xs mb-3">{{ day.weather[0].description }}</p>
        <p class="text-xs"><strong>{{ (day.temp.day - 273.15).toFixed(1) }}°C</strong></p>
      </div>
    </div>

  </div>
</template>

<style scoped>
.forecast-container {
  display: flex;
  gap: 0.5rem;       
  overflow-x: auto;  
  padding-bottom: 1rem; 
  scrollbar-width: none; /* Nasconde la barra su Firefox */
}
.forecast-container::-webkit-scrollbar {
  display: none; /* Nasconde la barra su Chrome, Safari e Edge */
}
</style>
