<script>
import HeroComponent from '../components/HeroComponent.vue';
import AboutComponent from '../components/AboutComponent.vue';
import ServiceComponent from '../components/ServiceComponent.vue'
import ProjectComponent from '../components/ProjectComponent.vue'

export default {
    components: {
        HeroComponent,
        AboutComponent,
        ServiceComponent,
        ProjectComponent
    }
}

</script>

<template>
    <HeroComponent />
    <AboutComponent />
    <ServiceComponent />
    <ProjectComponent />
</template>

<style lang="scss" scoped></style>