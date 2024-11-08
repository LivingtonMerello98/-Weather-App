<script>
import { store } from '../store';

export default {
  name: 'CurrentWeather',
  computed: {
    // Ottieni i dati meteo correnti dallo store
    currentWeather() {
      return store.getters.currentWeather(); 
    },

    //metodo che ritorna weather.data.current dallo store e valuta l'esistenza di valori
    temperature() {
      return this.currentWeather ? (this.currentWeather.temp - 273.15).toFixed(2) : null;  // Converte la temperatura da Kelvin a Celsius
    },
    feelsLike() {
      return this.currentWeather ? (this.currentWeather.feels_like - 273.15).toFixed(2) : null; // Converte la "feel-like" temperature
    },
    humidity() {
      return this.currentWeather ? this.currentWeather.humidity : null;
    },
    pressure() {
      return this.currentWeather ? this.currentWeather.pressure : null;
    },
    windSpeed() {
      return this.currentWeather ? this.currentWeather.wind_speed : null;
    },
    windDirection() {
      return this.currentWeather ? this.currentWeather.wind_deg : null;
    },
    weatherDescription() {
      return this.currentWeather && this.currentWeather.weather && this.currentWeather.weather.length > 0
        ? this.currentWeather.weather[0].description
        : null;
    },
    weatherIcon() {
      return this.currentWeather && this.currentWeather.weather && this.currentWeather.weather.length > 0
        ? this.currentWeather.weather[0].icon
        : null;
    }
  }
}
</script>

<template>
  <div class="p-6 rounded-lg">
    <p>Current Weather</p>

    <!-- if statement che valuta l esistenza dei dati -->
    <div v-if="currentWeather">
      <!-- Icona meteo -->
      <div v-if="weatherIcon" class="flex items-center">
        <img :src="'https://openweathermap.org/img/wn/' + weatherIcon + '@2x.png'" alt="Weather icon" class="w-16 h-16"/>
        <div class="ml-4">
          <p class="text-3xl font-semibold">{{ temperature }}°C</p>
          <p class="text-lg">{{ weatherDescription }}</p>
        </div>
      </div>

      <!-- Dettagli meteo -->
      <div class="mt-4">
        <p><strong>Humidity:</strong> {{ humidity }}%</p>
        <p><strong>Pressure:</strong> {{ pressure }} hPa</p>
        <p><strong>Wind Speed:</strong> {{ windSpeed }} m/s</p>
        <p><strong>Wind Direction:</strong> {{ windDirection }}°</p>
        <p><strong>Feels Like:</strong> {{ feelsLike }}°C</p>
      </div>
    </div>
    <!-- Se i dati non sono ancora disponibili -->
    <div v-else class="mt-4 text-red-500">
      <p>insert city in the field</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
}

p {
  color: white;
}
</style>
