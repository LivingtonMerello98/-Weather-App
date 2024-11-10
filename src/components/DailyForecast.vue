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
    <h3 class="text-m font-semibold mb-4">10 Day Forecast</h3>
    <p v-if="!dailyWeather.length" class="text-blue-500">Daily Forecast not available.</p>

    <div v-else class="flex gap-2 overflow-x-auto">

      <!-- previsiomi giornaliere -->
      <div v-for="(day, index) in dailyWeather" :key="index" class="bg-gray-900 text-center rounded-lg p-6 w-48">
        <p class="font-semibold text-xs">{{ formatDate(day.dt) }}</p>
        <img :src="'https://openweathermap.org/img/wn/' + day.weather[0].icon + '@2x.png'" alt="Weather icon" class="mx-auto my-2 w-10 h-10" />
        <p class="text-xs">{{ day.weather[0].description }}</p>
        <p class="text-xs"><strong>{{ (day.temp.day - 273.15).toFixed(1) }}°C</strong></p>
      </div>

    </div>

  </div>
</template>


<style lang="scss" scoped>

</style>

