<script>
import { store } from '../store';

export default {
  data() {
    return {
      dataLoaded: false, // Variabile per controllare il caricamento dei dati
    };
  },
  computed: {
    currentCity() {
      return store.getters.cityName();
    },
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
    uviWidth() {
      return this.dataLoaded ? `${this.uvi * 9.09}%` : '0%';
    },
    windSpeedWidth() {
      return this.dataLoaded ? `${Math.min(this.windSpeed, 30) * 3.33}%` : '0%';
    },
    visibilityWidth() {
      return this.dataLoaded ? `${this.visibility / 100}%` : '0%';
    },
  },
  watch: {
    currentWeather(newValue) {
      if (newValue) {
        setTimeout(() => {
          this.dataLoaded = true;
        }, 100);
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.currentWeather) {
        setTimeout(() => {
          this.dataLoaded = true;
        }, 100); // Avvio dell'animazione con 100ms di ritardo
      }
    });
  },
};
</script>

<template>
  <div class="flex flex-col items-center text-center space-y-4 px-4">
    <p v-if="!currentWeather" class="text-blue-500">Please enter a valid city name.</p>

    <div v-else>
      <div class="flex flex-col md:flex-row w-full p-6">
        
        <div class="p-4 mb-4 md:mb-0 md:w-1/2 rounded-lg">
          <div class="flex items-center justify-center space-x-4 mb-3">
            <h3 class="city-title">{{ currentCity }}</h3>
          </div>
          <div v-if="weatherIcon" class="flex items-center justify-center mb-4">
            <img :src="'https://openweathermap.org/img/wn/' + weatherIcon + '@2x.png'" alt="Weather icon" class="w-20 h-20" />
          </div>
          <p class="text-6xl font-bold mb-3">{{ temperature }}°C</p>
          <p class="text-2xl capitalize mb-6">{{ weatherDescription }}</p>
          <div class="grid grid-cols-2 gap-4 text-sm text-gray-300">
            <div class="text-xs text-gray-400"><strong>Feels Like:</strong> {{ feelsLike }}°C</div>
            <div class="text-xs text-gray-400"><strong>Humidity:</strong> {{ humidity }}%</div>
            <div class="text-xs text-gray-400"><strong>Pressure:</strong> {{ pressure }} hPa</div>
          </div>
        </div>

        <div class="flex flex-col items-center justify-end p-4 md:w-1/2 rounded-lg">
          
          <!-- Barra per UVI -->
          <div class="w-full mb-4 text-start">
            <p class="mb-2 text-xs text-gray-400">UV Index: {{ uvi }}</p>
            <div class="relative pt-1">
              <div class="flex mb-2 items-center justify-between">
                <span class="text-xs text-gray-400">0</span>
                <span class="text-xs text-gray-400">11+</span>
              </div>
              <div class="w-full h-1 rounded-full bg-yellow-300 loading-bar" :class="{ 'loading-bar-active': dataLoaded }" :style="{ width: uviWidth }"></div>
            </div>
          </div>

          <!-- Barra per Wind Speed -->
          <div class="w-full mb-4 text-start">
            <p class="mb-2 text-xs text-gray-400">Wind Speed: {{ windSpeed }} m/s</p>
            <div class="relative pt-1">
              <div class="flex mb-2 items-center justify-between">
                <span class="text-xs text-gray-400">0</span>
                <span class="text-xs text-gray-400">30</span>
              </div>
              <div class="w-full h-1 rounded-full bg-blue-700 loading-bar" :class="{ 'loading-bar-active': dataLoaded }" :style="{ width: windSpeedWidth }"></div>
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
              <div class="w-full h-1 rounded-full bg-emerald-600 loading-bar" :class="{ 'loading-bar-active': dataLoaded }" :style="{ width: visibilityWidth }"></div>
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.city-title {
  font-size: 1.5rem;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 0;
}

.loading-bar {
  width: 0; /* Impostazione iniziale per l'animazione */
}

.loading-bar-active {
  transition: width 1s ease-in-out; /* Animazione della larghezza */
}
</style>
