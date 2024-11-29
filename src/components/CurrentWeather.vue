<script>
//blocco del tempo corrente
import { store } from '../store';

export default {
  name: 'CurrentWeather', // Nome del componente

  data() {
    return {
      dataLoaded: false, // Controlla se i dati meteo sono stati caricati
    };
  },

  computed: {
    // Recupera il nome della città corrente dallo store
    currentCity() {
      return store.getters.cityName();
    },

    // Recupera i dati meteo correnti dallo store
    currentWeather() {
      return store.getters.currentWeather();
    },

    // COntrolla se getters.currentWeather restituisce risultati con il chaining operator
    // - Se restituisce qualcosa accediamo alla proprietà .temp
    // - Converte la temperatura da Kelvin a Celsius
    temperature() {
      return this.currentWeather ? (this.currentWeather.temp - 273.15).toFixed(1) : null;
    },

    // Converte la temperatura "percepita" da Kelvin a Celsius
    feelsLike() {
      return this.currentWeather ? (this.currentWeather.feels_like - 273.15).toFixed(1) : null;
    },

    // Ritorna il livello di umidità
    humidity() {
      return this.currentWeather ? this.currentWeather.humidity : null;
    },

    // Ritorna la pressione atmosferica
    pressure() {
      return this.currentWeather ? this.currentWeather.pressure : null;
    },

    // Descrizione testuale del meteo (es. "clear sky")
    weatherDescription() {
      return this.currentWeather.weather?.[0]?.description || '';
    },

    // Icona del meteo (codice immagine da OpenWeather)
    weatherIcon() {
      return this.currentWeather.weather?.[0]?.icon || '';
    },

    // Indice UV (radiazione ultravioletta)
    uvi() {
      return this.currentWeather ? this.currentWeather.uvi : null;
    },

    // Velocità del vento
    windSpeed() {
      return this.currentWeather ? this.currentWeather.wind_speed : null;
    },

    // Visibilità (in metri)
    visibility() {
      return this.currentWeather ? this.currentWeather.visibility : null;
    },

    // Larghezza barra UV (in percentuale, usata per l'animazione)
    uviWidth() {
      return this.dataLoaded ? `${this.uvi * 9.09}%` : '0%';
    },

    // Larghezza barra velocità del vento (in percentuale)
    windSpeedWidth() {
      return this.dataLoaded ? `${Math.min(this.windSpeed, 30) * 3.33}%` : '0%';
    },

    // Larghezza barra visibilità (in percentuale)
    visibilityWidth() {
      return this.dataLoaded ? `${this.visibility / 100}%` : '0%';
    },

    // Controlla se la città è tra i preferiti
    isCityInFavourites() {
      return store.state.favourites.includes(this.currentCity);
    }
  },

  watch: {

    // Osserva i cambiamenti nei dati meteo e avvia l'animazione al caricamento
    currentWeather(newValue) {
      if (newValue) {
        setTimeout(() => {
          this.dataLoaded = true;
        }, 100);
      }
    },
    
  },

  methods: {
    // Aggiunge la città corrente ai preferiti
    addToFavourites() {
      if (!this.isCityInFavourites) {
        store.mutations.ADD_FAVOURITE(this.currentCity);
      }
    },

    // Seleziona una città, aggiorna lo stato e chiama l'API per i nuovi dati meteo
    selectCity(city) {
      store.mutations.SET_CITY_NAME(city); // Aggiorna il nome della città
      store.actions.fetchWeatherData(city); // Recupera i dati meteo
      store.mutations.CLOSE_MENU(); // Chiude il menu
    },
  },

  mounted() {
    // Avvia l'animazione delle barre al caricamento del componente
    this.$nextTick(() => {
      if (this.currentWeather) {
        setTimeout(() => {
          this.dataLoaded = true;
        }, 100);
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
        
        <div class="p-4 mb-4 md:mb-0 md:w-1/2 rounded-lg relative">
          <div class="flex items-center justify-center space-x-4 mb-3 relative">
            <h3 class="city-title">
              <!-- Mostra l'icona solo se currentCity è "Your position" -->
              <font-awesome-icon v-if="currentCity === 'Your position'" :icon="['fas', 'map-marker-alt']" class="text-red-500 pulse"/>
              <p v-else>
                {{ currentCity }}
              </p>
            </h3>
            <div class="absolute left-0 top-0">
              <!-- Pulsante per aggiungere ai preferiti -->
              <button 
                v-if="!isCityInFavourites" 
                @click="addToFavourites(currentCity)" 
                class="text-white px-3 py-2 rounded hover:bg-gray-600 text-sm"
              >
              <font-awesome-icon icon="plus" class="text-blue-500"/> 
              </button>
              <span v-if="isCityInFavourites">
                <font-awesome-icon icon="star" class=" text-yellow-500 p-2 mt-1 rounded text-sm" />
              </span>
            </div>
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

.absolute {
  position: absolute;
  left: -50px;
  top: 0;
}

/* CSS per l'effetto pulsante con onde */
.pulse {
  position: relative; /* Per posizionare correttamente gli effetti al centro dell'icona */
  animation: pulse-animation 2s infinite; /* Animazione continua */
}

.pulse::after {
  content: ''; /* Creiamo un elemento pseudo dopo l'icona */
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50px; /* La larghezza iniziale della prima onda */
  height: 50px; /* L'altezza iniziale della prima onda */
  background: rgba(255, 0, 0, 0.5); /* Colore rosso con opacità */
  border-radius: 50%; /* Rendi l'onda rotonda */
  transform: translate(-50%, -50%); /* Centra l'onda nell'icona */
  animation: wave-animation 2s infinite; /* Animazione dell'onda */
  pointer-events: none; /* Assicura che l'onda non interferisca con l'interazione dell'utente */
}

@keyframes pulse-animation {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.5); 
    opacity: 0; 
  }
  100% {
    transform: scale(2); 
    opacity: 1; 
  }
}

@keyframes wave-animation {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.5); 
    opacity: 0.5; 
  }
  100% {
    transform: scale(2); 
    opacity: 0;
  }
}

</style>
