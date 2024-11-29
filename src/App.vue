<script>

//destrutturazione dello store dal file store.
import { store } from './store';

//import componenti
import SearchBarComponent from './components/SearchBarComponent.vue';
import CurrentWeather from './components/CurrentWeather.vue';
import DailyForecast from './components/DailyForecast.vue';
import HourlyForecast from './components/HourlyForecast.vue';
import SplashPage from './components/SplashPage.vue';
import SideMenu from './components/SideMenu.vue'; // Importa SideMenu

export default {
  data() {
    return {

      //flag a true per mostrare la splashPage.
      showSplash: true, 

    };
  },
  components: {

    //registrazione componenti
    SplashPage,
    SearchBarComponent,
    CurrentWeather,
    DailyForecast,
    HourlyForecast,
    SideMenu, 
  },

  //funzioni reattive ai cambiamenti in store
  computed: {

    //funzione get in store per il messaggio di errore
    errorMessage() {
      return store.getters.errorMessage();
    },

    isLoading() {
      return store.getters.isLoading();
    }

  },

  //ciclo di vita mounted: appena il componente è disponibile nel dom
  mounted() {

    //con setiTimeOut cambiamo il flag a false con 1s di ritardo.
    setTimeout(() => {
      this.showSplash = false;
    }, 1000); 

  },
};
</script>

<template>
  <section class="bg-gradient-to-b from-gray-700 to-gray-900 text-gray-100 min-h-screen p-8">


    <!-- Splash Page, visibie se il flag è a true -->
    <SplashPage v-if="showSplash" />


    <div class="max-w-4xl mx-auto space-y-8">
      <!-- Search Bar -->
      <SearchBarComponent />



      <div v-if="errorMessage" class="text-red-500 text-center">
        {{ errorMessage }}
      </div>


      <!-- se il valore è true sta ancora caricando -->
      <div v-if="isLoading" class="flex justify-center">
        <p>Loading...</p>
      </div>

      <!-- Current Weather -->
      <div v-if="!isLoading && !errorMessage" class="bg-gray-800 rounded-lg shadow-lg p-6">
        <CurrentWeather />
      </div>

      <!-- Hourly Forecast -->
      <div v-if="!isLoading && !errorMessage" class="bg-gray-800 rounded-lg shadow-lg p-6">
        <HourlyForecast />
      </div>

      <!-- Daily Forecast -->
      <div v-if="!isLoading && !errorMessage" class="bg-gray-800 rounded-lg shadow-lg p-6">
        <DailyForecast />
      </div>
    </div>

    <!-- Side Menu-->
    <SideMenu />
  </section>
</template>
