<script>
import { store } from '../store';

export default {
  data() {
    return {
      name: 'HourlyForecast',
      hourlyData: [],  // Per memorizzare i dati orari
    };
  },
  methods: {
    updateHourlyData() {
      // Aggiorna hourlyData solo se weatherData è disponibile e ha dati hourly
      if (store.weatherData && store.weatherData.hourly) {
        this.hourlyData = store.weatherData.hourly;
        console.log("Dati orari caricati:", this.hourlyData);
      } else {
        console.warn("Dati meteo non disponibili.");
      }
    },
  },
  watch: {
    // Guarda store.weatherData per aggiornamenti
    "store.weatherData": {
      handler() {
        this.updateHourlyData();
      },
      immediate: true, // Esegue il watcher immediatamente al montaggio
    },
  },
  mounted() {
    this.updateHourlyData(); // Carica subito i dati orari se già disponibili
  },
};
</script>

<template>
  <div class="container">
    <h3>Hourly Weather Forecast</h3>
    <ul>
      <li v-for="(item, index) in hourlyData" :key="index">
        <!-- Visualizza i dati orari -->
        {{ item.temp }} °C - {{ item.dt }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
/* Stili aggiuntivi */
</style>

