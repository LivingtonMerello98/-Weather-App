<script>
import SearchBarComponent from './SearchBarComponent.vue';

export default {
  data() {
    return {
      name: 'HeaderComponent',
    };
  },

  components: {
    SearchBarComponent,
  },
};
</script>

<template>
    <header class="bg-blue-950 text-white py-3">
      <div class="max-w-screen-xl mx-auto flex justify-end">

            <div>
                <SearchBarComponent />
            </div>
            
      </div>
    </header>
</template>
  

<style lang="scss" scoped>

</style>
