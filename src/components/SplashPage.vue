<script>
export default {
  data() {
    return {
      show: true,  // Variabile per mostrare/nascondere la splash screen
    };
  },
  mounted() {
    // Disabilita lo scroll quando la splash screen è visibile
    document.body.style.overflow = 'hidden';

    // Mostra la splash page per 2 secondi
    setTimeout(() => {
      this.show = false; // Nasconde la splash page

      // Riabilita lo scroll dopo che la splash screen è nascosta
      document.body.style.overflow = 'auto';
    }, 2000); // 2000ms = 2 secondi
  },
  beforeDestroy() {
    document.body.style.overflow = 'auto';
  }
};
</script>

<template>
  <div v-if="show" class="splash-screen bg-gradient-to-b from-gray-700 to-gray-900">
    <img src="/thumb.svg" alt="Splash Image" class="splash-image mb-3" />
    
    <!-- Spinner e testo Loading -->
    <div class="spinner-container">
      <div class="spinner"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 2rem;
  font-weight: bold;
  color: white;
  z-index: 9999; /* Assicurati che la splash page si sovrapponga agli altri contenuti */
  text-align: center;
}

.splash-image {
  width: 80%;  
  max-width: 400px;  
}

.spinner-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px; /* Distanza tra l'immagine e lo spinner */
}

.spinner {
  border: 8px solid #f3f3f3; /* Colore del bordo esterno */
  border-top: 8px solid #3498db00; /* Colore del bordo che gira */
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite; /* Animazione di rotazione */
}

.loading-text {
  margin-top: 10px;
  font-size: 1.5rem;
  color: white;
  font-weight: normal;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
