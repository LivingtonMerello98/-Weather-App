<script>

import FindUs from '../components/FindUsComponent.vue';
import FormComponent from '../components/FormComponent.vue';

export default {
    name: 'ContactPage',

    components: {
        FindUs,
        FormComponent
    }
}

</script>

<template>
    <FormComponent />
    <FindUs />
</template>

<style lang="scss" scoped></style>