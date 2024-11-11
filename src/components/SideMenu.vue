<script>
import { store } from '../store';

export default {
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  computed: {
    isVisible() {
      return store.state.isMenuVisible;
    },
    favourites() {
      return store.state.favourites; // Otteniamo la lista dei preferiti dallo store
    },
    currentCity() {
      return store.state.cityName; // Otteniamo la città corrente dallo store
    }
  },
  methods: {
    handleClickOutside(event) {
      const sideMenu = this.$refs.sideMenu;
      if (sideMenu && !sideMenu.contains(event.target)) {
        store.mutations.CLOSE_MENU(); // Chiude il menu solo quando si clicca fuori
      }
    },
    selectCity(city) {
      store.mutations.SET_CITY_NAME(city); // Setta la città selezionata come città corrente
      store.actions.fetchWeatherData(city); // Carica i dati meteo per la città selezionata
      store.mutations.CLOSE_MENU(); // Chiude il menu
    },
    addToFavourites() {
      if (this.currentCity && !this.favourites.includes(this.currentCity)) {
        store.mutations.ADD_FAVOURITE(this.currentCity); // Aggiungi la città ai preferiti
      }
    },
    removeFromFavourites(city) {
      store.mutations.REMOVE_FAVOURITE(city); // Rimuovi la città dai preferiti
    }
  },
};
</script>

<template>
  <div
    v-if="isVisible"
    ref="sideMenu"
    class="fixed top-0 right-0 w-64 h-full bg-gray-800 text-white p-4 shadow-lg transform transition-transform duration-300"
    :class="{'translate-x-0': isVisible, 'translate-x-full': !isVisible}"
  >
    <h2 class="text-sm font-semibold mb-4 text-grey-400">Favourites</h2>
    
    <!-- Lista dei preferiti -->
    <ul>
      <li
        v-for="(city, index) in favourites"
        :key="index"
        class="py-2 cursor-pointer "
        @click="selectCity(city)"
      >
        <div class="flex justify-between mb-3">
            <p class="capitalize text-sm">{{ city }}</p>
            <font-awesome-icon icon="trash" class="text-red-500 text-sm hover:text-red-700 px-3" @click.stop="removeFromFavourites(city)"  />
        </div>
      </li>
    </ul>

    <!-- Aggiungi città corrente ai preferiti -->
    <div v-if="currentCity && !favourites.includes(currentCity)" class="mt-4">
      <button 
        @click="addToFavourites" 
        class="w-full py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 text-sm capitalize"
      >
        + {{ currentCity }} to Favourites
      </button>
    </div>
  </div>
</template>

<style scoped>
.translate-x-full {
  transform: translateX(100%);
}
.translate-x-0 {
  transform: translateX(0);
}
</style>
