<script>
import { store } from '../store';

export default {
  computed: {
    currentWeather() {
      return store.getters.currentWeather();
    },
    temperature() {
      return this.currentWeather ? (this.currentWeather.temp - 273.15).toFixed(1) : null;
    },
    feelsLike() {
      return this.currentWeather ? (this.currentWeather.feels_like - 273.15).toFixed(1) : null;
    },
    humidity() {
      return this.currentWeather ? this.currentWeather.humidity : null;
    },
    pressure() {
      return this.currentWeather ? this.currentWeather.pressure : null;
    },
    weatherDescription() {
      return this.currentWeather.weather?.[0]?.description || '';
    },
    weatherIcon() {
      return this.currentWeather.weather?.[0]?.icon || '';
    },
    uvi() {
      return this.currentWeather ? this.currentWeather.uvi : null;
    },
    windSpeed() {
      return this.currentWeather ? this.currentWeather.wind_speed : null;
    },
    visibility() {
      return this.currentWeather ? this.currentWeather.visibility : null;
    },
  },
};
</script>

<template>
  <div class="flex flex-col items-center text-center space-y-4 px-4">
    <p v-if="!currentWeather" class="text-red-500">Please enter a valid city name.</p>

    <div v-else>
      <!-- Contenitore principale con gradiente di sfondo -->
      <div class="flex flex-col md:flex-row w-full p-6">

        <!-- Componente 1 (Icona meteo, temperatura e descrizione) -->
        <div class="p-4 mb-4 md:mb-0 md:w-1/2 rounded-lg">
          <div v-if="weatherIcon" class="flex items-center justify-center mb-4">
            <img :src="'https://openweathermap.org/img/wn/' + weatherIcon + '@2x.png'" alt="Weather icon" class="w-20 h-20" />
          </div>
          <p><strong>modificato in produzione</strong></p>
          <p class="text-6xl font-bold mb-3">{{ temperature }}°C</p>
          <p class="text-2xl capitalize mb-4">{{ weatherDescription }}</p>
          <div class="grid grid-cols-2 gap-4 text-sm text-gray-300">
            <div><strong>Feels Like:</strong> {{ feelsLike }}°C</div>
            <div><strong>Humidity:</strong> {{ humidity }}%</div>
            <div><strong>Pressure:</strong> {{ pressure }} hPa</div>
          </div>
        </div>

        <!-- Componente 2 (Barre per UVI, Wind Speed e Visibility) -->
        <div class="flex flex-col items-center justify-center p-4 md:w-1/2 rounded-lg">

          <!-- Barra per UVI -->
          <div class="w-full mb-4 text-start">
            <p class="mb-2 text-xs text-gray-400">UV Index: {{ uvi }}</p>
            <div class="relative pt-1">
              <div class="flex mb-2 items-center justify-between">
                <span class="text-xs">0</span>
                <span class="text-xs">11+</span>
              </div>
              <div class="w-full h-1 rounded-full bg-yellow-300" :style="{ width: `${uvi * 9.09}%` }"></div>
            </div>
          </div>

          <!-- Barra per Wind Speed -->
          <div class="w-full mb-4 text-start">
            <p class="mb-2 text-xs text-gray-400">Wind Speed: {{ windSpeed }} m/s</p>
            <div class="relative pt-1">
              <div class="flex mb-2 items-center justify-between">
                <span class="text-xs">0</span>
                <span class="text-xs">30</span>
              </div>
              <div class="w-full h-1 rounded-full bg-blue-700" :style="{ width: `${Math.min(windSpeed, 30) * 3.33}%` }"></div>
            </div>
          </div>

          <!-- Barra per Visibility -->
          <div class="w-full mb-4 text-start">
            <p class="mb-2 text-xs text-gray-400">Visibility: {{ visibility }} meters</p>
            <div class="relative pt-1">
              <div class="flex mb-2 items-center justify-between">
                <span class="text-xs text-gray-400">0</span>
                <span class="text-xs text-gray-400">10000</span>
              </div>
              <div class="w-full h-1 rounded-full bg-emerald-600" :style="{ width: `${visibility / 100}%` }"></div>
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
/* Stili aggiuntivi se necessari */
</style>
