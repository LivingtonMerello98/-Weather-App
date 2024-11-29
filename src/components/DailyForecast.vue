<script>
import { store } from '../store';
export default {
  name: 'DailyForecast',
  data() {
    return {
      isDragging: false,  // Controlla se l'utente sta trascinando il contenitore
      startX: 0,          // Posizione iniziale del mouse all'inizio del trascinamento
      scrollLeft: 0,      // Posizione iniziale dello scroll
      velocity: 0,        // Velocità dello scorrimento per inerzia
      animationFrame: null, // Riferimento all'animazione in corso
    };
  },
  computed: {
    dailyWeather() {
      // Ottiene le previsioni giornaliere dallo store
      return store.getters.dailyWeather();
    },
    formatDate() {
      // Restituisce una funzione per formattare la data in un formato leggibile (es. "Mon 29")
      return (timestamp) =>
        new Date(timestamp * 1000).toLocaleDateString('en-GB', {
          weekday: 'short',
          day: 'numeric',
        });
    },
  },
  methods: {
    // Inizia il trascinamento: salva la posizione iniziale del mouse e dello scroll
    startDrag(e) {
      this.isDragging = true;
      this.startX = e.pageX - this.$refs.forecastContainer.offsetLeft;
      this.scrollLeft = this.$refs.forecastContainer.scrollLeft;
      this.velocity = 0; // Reset della velocità
      cancelAnimationFrame(this.animationFrame); // Interrompe eventuali animazioni precedenti
    },
    // Gestisce il trascinamento: aggiorna la posizione dello scroll basandosi sul movimento del mouse
    onDrag(e) {
      if (!this.isDragging) return; // Ignora se non si sta trascinando
      const x = e.pageX - this.$refs.forecastContainer.offsetLeft;
      const walk = (x - this.startX) * 1.5; // Calcola quanto scrollare
      this.$refs.forecastContainer.scrollLeft = this.scrollLeft - walk;
      this.velocity = walk; // Aggiorna la velocità per l'inerzia
    },
    // Ferma il trascinamento e avvia l'inerzia
    stopDrag() {
      this.isDragging = false;
      this.inertiaScroll(); // Avvia l'effetto di scorrimento "inerziale"
    },
    // Effetto inerziale: continua a scrollare rallentando gradualmente
    inertiaScroll() {
      if (Math.abs(this.velocity) < 0.1) return; // Ferma l'animazione se la velocità è bassa
      this.$refs.forecastContainer.scrollLeft -= this.velocity; // Scrolla in base alla velocità
      this.velocity *= 0.95; // Riduce la velocità a ogni frame
      this.animationFrame = requestAnimationFrame(this.inertiaScroll); // Richiama se stesso finché non si ferma
    },
  },
};

</script>

<template>
  <div>
    <!-- Titolo -->
    <h3 class="text-m font-semibold mb-5">10 Day Forecast</h3>
    
    <!-- Messaggio di errore se le previsioni non sono disponibili -->
    <p v-if="!dailyWeather.length" class="text-blue-500">Daily Forecast not available.</p>

    <!-- Contenitore delle previsioni con eventi di trascinamento -->
    <div 
      v-else 
      ref="forecastContainer" 
      class="forecast-container"
      @mousedown="startDrag"    
      @mousemove="onDrag"       
      @mouseleave="stopDrag"    
      @mouseup="stopDrag"       
    >
      <!-- Itera sulle previsioni giornaliere -->
      <div 
        v-for="(day, index) in dailyWeather" 
        :key="index" 
        class="bg-gray-900 text-center rounded-lg p-6" 
        style="min-width: 150px;"
      >
        <!-- Data -->
        <p class="font-semibold text-xs">{{ formatDate(day.dt) }}</p>
        
        <!-- Icona meteo -->
        <img 
          :src="'https://openweathermap.org/img/wn/' + day.weather[0].icon + '@2x.png'" 
          alt="Weather icon" 
          class="mx-auto my-2 w-15 h-15" 
        />
        
        <!-- Descrizione meteo -->
        <p class="text-xs mb-3">{{ day.weather[0].description }}</p>
        
        <!-- Temperatura -->
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
