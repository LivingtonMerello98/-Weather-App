<script>
//importare store
//imporare axios
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';


export default {

    components: {
        HeaderComponent,
        FooterComponent
    }
}

</script>

<template>
    <!--sfondo scuro-->
    <section class="bg-dark">
        <HeaderComponent />
        <router-view></router-view>
        <FooterComponent />
    </section>
</template>

<style></style>
