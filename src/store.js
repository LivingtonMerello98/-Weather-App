import { reactive } from 'vue';

export const store = reactive({
    apiUrl: import.meta.env.VITE_API_URL,
    geocodeUrl: `${import.meta.env.VITE_GEOCODE_URL}?appid=${import.meta.env.VITE_API_KEY}`,

    weatherData: null, // memorizza dati meteo generali
    loading: false, // gestisce stato di caricamento
    error: null,

    // metodo per aggiornare dati meteo
    setWeatherData(data) {
        this.weatherData = data;
    },

    // metodo per gestire gli errori
    setError(error) {
        this.error = error;
    },

    setLoading(isLoading) {
        this.loading = isLoading;
    },
});
