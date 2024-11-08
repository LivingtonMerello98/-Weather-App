<script>
import { store } from '../store';

export default {
  name: 'CurrentWeather',
  computed: {
    weatherData() {
      return store.weatherData?.current;  // Aggiungiamo l'accesso a current
    },
    temperature() {
      return this.weatherData ? (this.weatherData.temp - 273.15).toFixed(2) : null;  // Converto da Kelvin a Celsius
    },
    humidity() {
      return this.weatherData ? this.weatherData.humidity : null;
    },
    pressure() {
      return this.weatherData ? this.weatherData.pressure : null;
    },
    windSpeed() {
      return this.weatherData ? this.weatherData.wind_speed : null;
    },
    windDirection() {
      return this.weatherData ? this.weatherData.wind_deg : null;
    },
    description() {
      return this.weatherData && this.weatherData.weather?.length > 0
        ? this.weatherData.weather[0].description
        : null;
    },
    icon() {
      return this.weatherData && this.weatherData.weather?.length > 0
        ? this.weatherData.weather[0].icon
        : null;
    }
  }
}
</script>

<template>
  <div class=" p-6 rounded-lg shadow-md">
    <!-- Se i dati meteo sono disponibili, visualizzali -->
    <div v-if="weatherData" class="mt-4">
      <div v-if="icon" class="flex items-center">
        <img :src="'https://openweathermap.org/img/wn/' + icon + '@2x.png'" alt="Weather icon" class="w-16 h-16"/>
        <div class="ml-4">
          <p class="text-3xl font-semibold">{{ temperature }}°C</p>
          <p class="text-lg">{{ description }}</p>
        </div>
      </div>

      <!-- Dettagli meteo -->
      <div class="mt-4">
        <p><strong>Humidity:</strong> {{ humidity }}%</p>
        <p><strong>Pressure:</strong> {{ pressure }} hPa</p>
        <p><strong>Wind Speed:</strong> {{ windSpeed }} m/s</p>
        <p><strong>Wind Direction:</strong> {{ windDirection }}°</p>
      </div>
    </div>

    <!-- Se i dati non sono ancora disponibili -->
    <div v-else class="mt-4 text-red-500">
      <p>Loading weather data...</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
}

p{
    color: white;
}
</style>
