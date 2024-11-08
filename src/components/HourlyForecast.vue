<script>
import { store } from '../store';

export default {
  name: 'HourlyWeather',
  computed: {
    hourlyWeather() {
      return store.getters.hourlyWeather(); // Ottieni i dati orari dallo store
    },
    convertToCelsius() {
      return (kelvin) => (kelvin - 273.15).toFixed(2); // Funzione per convertire da Kelvin a Celsius
    },
    formatTime() {
      return (timestamp) => {
        const date = new Date(timestamp * 1000); // Converte il timestamp Unix in millisecondi
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Mostra l'ora in formato 12h o 24h
      };
    }
  }
}
</script>

<template>
  <div class="p-6 rounded-lg">
    <h3 class="text-xl font-semibold mb-4">Hourly Forecast</h3>
    <div class="carousel-container">
      <div v-if="hourlyWeather.length > 0" class="carousel">
        <div class="carousel-item" v-for="(hour, index) in hourlyWeather" :key="index">
          <div class="weather-card">
            <p class="time">{{ formatTime(hour.dt) }}</p>
            <img :src="'https://openweathermap.org/img/wn/' + hour.weather[0].icon + '@2x.png'" alt="Weather icon" class="weather-icon"/>
            <p class="description">{{ hour.weather[0].description }}</p>
            <p class="temp">{{ convertToCelsius(hour.temp) }} °C</p>
            <p class="feels-like">Feels Like: {{ convertToCelsius(hour.feels_like) }} °C</p>
            <p class="humidity">Humidity: {{ hour.humidity }}%</p>
            <p class="pressure">Pressure: {{ hour.pressure }} hPa</p>
          </div>
        </div>
      </div>
      <div v-else>
        <p>insert a city in the field</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.carousel-container {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 10px;
}

.carousel {
  display: flex;
  gap: 10px; /* Distanza tra le card */
}

.carousel-item {
  flex: 0 0 auto; /* Impedisce la ridistribuzione e rende la card non ridimensionabile */
  width: 250px; /* Larghezza fissa della card */
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  text-align: center;
}

.weather-card {
  padding: 16px;
}

.weather-icon {
  width: 50px;
  height: 50px;
}

.time {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 8px;
}

.description {
  font-size: 0.9rem;
  margin-bottom: 8px;
}

.temp, .feels-like, .humidity, .pressure {
  font-size: 0.8rem;
  margin-bottom: 4px;
}

@media (max-width: 768px) {
  .carousel {
    flex-wrap: nowrap;
  }

  .carousel-item {
    width: 180px; /* Card più piccole sui dispositivi mobili */
  }
}
</style>
