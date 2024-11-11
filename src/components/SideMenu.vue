
<!-- sideMenu -->
<script>
import { store } from '../store';

export default {
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  computed: {
    isVisible() {
      console.log("Menu visibility (computed):", store.state.isMenuVisible); // Debug log
      return store.state.isMenuVisible;
    }
  },
  methods: {
    handleClickOutside(event) {
      const sideMenu = this.$refs.sideMenu;
      if (sideMenu && !sideMenu.contains(event.target)) {
        store.mutations.CLOSE_MENU(); // Chiude il menu solo quando si clicca fuori
      }
    }
  }
};
</script>

  
<template>
    <div
        v-if="isVisible"
        ref="sideMenu"
        class="fixed top-0 right-0 w-64 h-full bg-gray-800 text-white p-4 shadow-lg transform transition-transform duration-300"
        :class="{'translate-x-0': isVisible, 'translate-x-full': !isVisible}"
    >
        <p>Ciao mondo</p>
    </div>
</template>

<style scoped>

.translate-x-full {
transform: translateX(100%);
}
.translate-x-0 {
transform: translateX(0);
}
</style>
  