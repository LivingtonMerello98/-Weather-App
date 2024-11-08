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

      <!-- Current Weather -->
      <div class="flex flex-col p-4 gap-4">
        <div class="w-full bg-blue-950 rounded-lg">
            <CurrentWeather />
        </div>
      </div>

      <!-- Hourly Forecast -->
      <div class="flex flex-col p-4 gap-4">
        <div class="w-full bg-gray-300 rounded-lg">
          <HourlyForecast />
        </div>
      </div>

      <!-- Hourly Forecast -->
      <div class="flex flex-col p-4 gap-4">
        <div class="w-full bg-gray-300 rounded-lg">
          <DailyForecast />
        </div>
      </div>
  
    </section>
  </template>
  

<style lang="scss" scoped>

 
</style>

