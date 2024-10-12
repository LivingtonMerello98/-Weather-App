<script>
//importare store
//importare axios
import HeaderComponent from './components/HeaderComponent.vue';
import WeatherDisplay from './components/WeatherDisplay.vue';



export default {

    components: {
        HeaderComponent,
        WeatherDisplay
    }
}

</script>

<template>
    <section>
        <HeaderComponent />
        <div class="col-md-6">
            <!-- weather-display -->
            <WeatherDisplay/>
        </div>
        <div class="col-md-6">
            <!-- weather-forecast -->

        </div>
    </section>
</template>

<style></style>
