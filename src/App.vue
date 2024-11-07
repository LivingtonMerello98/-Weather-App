<script>
//importare store
//importare axios
import HeaderComponent from './components/HeaderComponent.vue';
import WeatherDisplay from './components/WeatherDisplay.vue';
import WeatherForecast from './components/WeatherForecast.vue';



export default {

    components: {
        HeaderComponent,
        WeatherDisplay,
        WeatherForecast
    }
}

</script>

<template>
    <section>
        <HeaderComponent />
        <div>
            <div>
                <div>
                    <!-- weather-display -->
                    <WeatherDisplay/>
                </div>
                <div >
                    <!-- weather-forecast -->
                    <WeatherForecast/>
                </div>
            </div>
        </div>
    </section>
</template>

<style></style>
