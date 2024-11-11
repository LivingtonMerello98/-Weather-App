<script>
import { store } from '../store';
export default {
  name: 'DailyForecast',
  data() {
    return {
      isDragging: false,
      startX: 0,
      scrollLeft: 0,
      velocity: 0,      // Velocità del lancio
      animationFrame: null,
    };
  },
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
  },
  methods: {
    startDrag(e) {
      this.isDragging = true;
      this.startX = e.pageX - this.$refs.forecastContainer.offsetLeft;
      this.scrollLeft = this.$refs.forecastContainer.scrollLeft;
      this.velocity = 0;
      cancelAnimationFrame(this.animationFrame); // Annulla qualsiasi animazione precedente
    },
    onDrag(e) {
      if (!this.isDragging) return;
      const x = e.pageX - this.$refs.forecastContainer.offsetLeft;
      const walk = (x - this.startX) * 1.5; // Velocità dello scorrimento
      this.$refs.forecastContainer.scrollLeft = this.scrollLeft - walk;
      this.velocity = walk; // Aggiorna la velocità
    },
    stopDrag() {
      this.isDragging = false;
      this.inertiaScroll(); // Avvia lo scorrimento con inerzia
    },
    inertiaScroll() {
      if (Math.abs(this.velocity) < 0.1) return; // Ferma se la velocità è troppo bassa
      this.$refs.forecastContainer.scrollLeft -= this.velocity;
      this.velocity *= 0.95; // Rallenta gradualmente
      this.animationFrame = requestAnimationFrame(this.inertiaScroll); // Richiama il metodo fino a fermarsi
    }
  }
};
</script>

<template>
  <div>
    <h3 class="text-m font-semibold mb-5">10 Day Forecast</h3>
    <p v-if="!dailyWeather.length" class="text-blue-500">Daily Forecast not available.</p>

    <div 
      v-else 
      ref="forecastContainer" 
      class="forecast-container"
      @mousedown="startDrag"
      @mousemove="onDrag"
      @mouseleave="stopDrag"
      @mouseup="stopDrag"
    >
      <!-- Previsioni giornaliere -->
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
  cursor:auto;
  scrollbar-width: none; /* Nasconde la barra su Firefox */
}
.forecast-container:active {
  cursor: grabbing;
}
.forecast-container::-webkit-scrollbar {
  display: none; /* Nasconde la barra su Chrome, Safari e Edge */
}
</style>
