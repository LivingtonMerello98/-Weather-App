<script>
import AboutComponent from '../components/AboutComponent.vue';
import ProjectComponent from '../components/ProjectComponent.vue';

export default {
    name: 'AboutPage',

    components: {
        AboutComponent,
        ProjectComponent
    }
}
</script>

<template>
    <AboutComponent />
    <ProjectComponent />
</template>

<style lang="scss" scoped></style>