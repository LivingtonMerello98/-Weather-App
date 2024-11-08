<script>
import CurrentWeather from './components/CurrentWeather.vue';
import DailyForecast from './components/DailyForecast.vue';
import HeaderComponent from './components/HeaderComponent.vue';
import HourlyForecast from './components/HourlyForecast.vue';
import MinutelyForecast from './components/MinutelyForecast.vue';

export default {
    components: {
        HeaderComponent,
        CurrentWeather,
        DailyForecast,
        HourlyForecast,
        MinutelyForecast
    }
}
</script>

<template>
    <section class="bg-gray-100 min-h-screen">
      <!-- Header -->
      <HeaderComponent />
  
      <div class="flex flex-col md:flex-row p-4 gap-6">
        <!-- Current Weather -->
        <div class="w-full md:w-2/5 bg-blue-950 p-6 rounded-lg">
          <CurrentWeather />
        </div>
  
        <!-- Daily Forecast -->
        <div class="w-full md:w-1/3 bg-green-500 p-6 rounded-lg">
          <DailyForecast />
        </div>
      </div>

      <!-- Hourly Forecast -->
      <div class="flex flex-col p-4 gap-4">
        <div class="w-full bg-gray-300 p-6 rounded-lg">
            <HourlyForecast />
        </div>
      </div>
  
      <div class="flex flex-col p-4 gap-4">
        <!-- Minutely Forecast -->
        <div class="w-full bg-gray-300 p-6 rounded-lg">
          <MinutelyForecast />
        </div>
      </div>
    </section>
  </template>
  

<style lang="scss" scoped>
/* Tailwind classes for responsive layout */

 
</style>

