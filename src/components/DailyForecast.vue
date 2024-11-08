<script>
import { store } from '../store';

export default {
  name: 'DailyForecast',
  computed: {
    dailyWeather() {
      return store.getters.dailyWeather(); // Ottiene la previsione giornaliera dallo store
    },
    formatDate() {
      return (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'short' });
      };
    },
    formatTime() {
      return (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      };
    },
    convertToCelsius() {
      return (kelvin) => (kelvin - 273.15).toFixed(1); // Conversione da Kelvin a Celsius
    }
  }
}
</script>

<template>
  <div class="daily-forecast-container p-6">
    <p class="text-xl font-semibold mb-4">Daily Forecast</p>
    <div class="slide-container">
      <div v-for="(day, index) in dailyWeather" :key="index" class="slide">
        <div class="date">{{ formatDate(day.dt) }}</div>

        <!-- Icona Meteo -->
        <img :src="'https://openweathermap.org/img/wn/' + day.weather[0].icon + '@2x.png'"
             alt="Weather icon"
             class="weather-icon" />

        <p class="description">{{ day.weather[0].description }}</p>

        <!-- Temperature -->
        <div class="temperature">
          <p>Max: {{ convertToCelsius(day.temp.max) }} °C</p>
          <p>Min: {{ convertToCelsius(day.temp.min) }} °C</p>
        </div>

        <!-- Alba e Tramonto -->
        <div class="sun-times">
          <p>Alba: {{ formatTime(day.sunrise) }}</p>
          <p>Tramonto: {{ formatTime(day.sunset) }}</p>
        </div>

        <!-- Sorgere e Tramonto della Luna -->
        <div class="moon-times">
          <p>Sorgere Luna: {{ formatTime(day.moonrise) }}</p>
          <p>Tramonto Luna: {{ day.moonset ? formatTime(day.moonset) : 'N/A' }}</p>
        </div>

        <!-- Umidità e Pressione -->
        <div class="other-info">
          <p>Umidità: {{ day.humidity }}%</p>
          <p>Pressione: {{ day.pressure }} hPa</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-container {
  display: flex;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  gap: 16px;
  padding-bottom: 10px;
}

.slide {
  flex: 0 0 auto;
  width: 250px;
  padding: 16px;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.date {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 8px;
}

.weather-icon {
  width: 50px;
  height: 50px;
  margin: 8px auto;
}

.description {
  font-size: 0.9rem;
  margin-bottom: 8px;
}

.temperature, .sun-times, .moon-times, .other-info {
  font-size: 0.8rem;
  margin: 8px 0;
}

@media (max-width: 768px) {
  .slide {
    width: 180px;
  }
}
</style>
