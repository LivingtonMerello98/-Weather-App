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

        //getter orario
        hourlyWeather() {
            return store.state.weatherData?.hourly || [];
        },

        //getter tempo corrente
        currentWeather() {
            return store.state.weatherData?.current || [];
        },

        //
        dailyWeather() {
            return store.state.weatherData?.daily || [];
        },
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

            try {
                // Chiamata API per ottenere coordinate della città
                const geoResponse = await axios.get(`${store.geocodeUrl}&q=${cityName}&limit=1`);

                if (!geoResponse.data.length) {
                    throw new Error('City not found');
                }

                const { lat, lon } = geoResponse.data[0];
                const weatherUrl = `${store.apiUrl}?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_API_KEY}`;

                // Chiamata API per ottenere dati meteo
                const weatherResponse = await axios.get(weatherUrl);
                store.mutations.SET_WEATHER_DATA(weatherResponse.data);

                // Log dei dati ricevuti dall'API
                console.log("Dati meteo ricevuti:", weatherResponse.data);

            } catch (error) {
                store.mutations.SET_ERROR(error.message);
            } finally {
                store.mutations.SET_LOADING(false);
            }
        },
    },
});
