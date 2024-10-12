<script>
//importare store
//imporare axios
import HeaderComponent from './components/HeaderComponent.vue';


export default {

    components: {
        HeaderComponent,
    }
}

</script>

<template>
    <section class="bg-dark">
        <HeaderComponent />
        <div class="col-md-6">
            <!-- weather-display -->

        </div>
        <div class="col-md-6">
            <!-- weather-forecast -->
             
        </div>
    </section>
</template>

<style></style>
