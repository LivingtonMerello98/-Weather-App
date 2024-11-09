import { reactive } from 'vue';
import axios from 'axios';

export const store = reactive({
    apiUrl: import.meta.env.VITE_API_URL,
    geocodeUrl: `${import.meta.env.VITE_GEOCODE_URL}?appid=${import.meta.env.VITE_API_KEY}`,


    // Stato
    state: {
        weatherData: null,
        loading: false,
        error: null,
    },

    // Getters
    getters: {
        // Getter per il meteo orario
        hourlyWeather() {
            return store.state.weatherData?.hourly || [];
        },
        // Getter per il meteo corrente
        currentWeather() {
            return store.state.weatherData?.current || null;
        },
        // Getter per il meteo giornaliero
        dailyWeather() {
            return store.state.weatherData?.daily || [];
        },
        isLoading() {
            return store.state.loading;
        },
        errorMessage() {
            return store.state.error;
        }
    },

    // Mutations
    mutations: {
        SET_WEATHER_DATA(data) {
            store.state.weatherData = data;
        },
        SET_LOADING(isLoading) {
            store.state.loading = isLoading;
        },
        SET_ERROR(error) {
            store.state.error = error;
        },
    },

    // Actions
    actions: {
        async fetchWeatherData(cityName) {
            store.mutations.SET_LOADING(true);
            store.mutations.SET_ERROR(null);

            try {
                // Chiamata API per ottenere le coordinate della città
                const geoResponse = await axios.get(`${store.geocodeUrl}&q=${cityName}&limit=1`);
                if (!geoResponse.data.length) {
                    throw new Error('City not found');
                }

                const { lat, lon } = geoResponse.data[0];
                const weatherUrl = `${store.apiUrl}?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_API_KEY}`;

                // Chiamata API per ottenere i dati meteo
                const weatherResponse = await axios.get(weatherUrl);
                store.mutations.SET_WEATHER_DATA(weatherResponse.data);

                console.log("Dati meteo ricevuti:", weatherResponse.data);

            } catch (error) {
                store.mutations.SET_ERROR(error.message || 'Failed to fetch weather data');
            } finally {
                store.mutations.SET_LOADING(false);
            }
        },
    },
});
