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
    <section>
        <HeaderComponent />
        <div>

        </div>
    </section>
</template>

<style></style>
