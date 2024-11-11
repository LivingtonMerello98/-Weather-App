import { reactive } from 'vue';
import axios from 'axios';

export const store = reactive({
    apiUrl: import.meta.env.VITE_API_URL,
    geocodeUrl: `${import.meta.env.VITE_GEOCODE_URL}?appid=${import.meta.env.VITE_API_KEY}`,

    state: {
        weatherData: null,
        loading: false,
        error: null,
        cityName: localStorage.getItem('cityName') || '', // Recupera la città dal localStorage
        isMenuVisible: false, // Stato per la visibilità del menu
        favourites: JSON.parse(localStorage.getItem('favourites')) || [], // Carica i preferiti da localStorage
    },

    getters: {
        hourlyWeather() {
            return store.state.weatherData?.hourly || [];
        },
        currentWeather() {
            return store.state.weatherData?.current || null;
        },
        dailyWeather() {
            return store.state.weatherData?.daily || [];
        },
        isLoading() {
            return store.state.loading;
        },
        errorMessage() {
            return store.state.error;
        },
        cityName() {
            return store.state.cityName;
        },
        favourites() {
            return store.state.favourites;
        }
    },

    mutations: {
        SET_WEATHER_DATA(data) {
            store.state.weatherData = data;
        },
        SET_LOADING(isLoading) {
            store.state.loading = isLoading;
        },
        SET_CITY_NAME(cityName) {
            store.state.cityName = cityName;
            localStorage.setItem('cityName', cityName); // Salva la città nel localStorage
        },
        SET_ERROR(error) {
            store.state.error = error;
        },
        TOGGLE_MENU() {
            store.state.isMenuVisible = !store.state.isMenuVisible;
        },
        CLOSE_MENU() {
            store.state.isMenuVisible = false;
        },
        ADD_FAVOURITE(cityName) {
            if (!store.state.favourites.includes(cityName)) {
                store.state.favourites.push(cityName);
                this.saveFavouritesToLocalStorage();
            }
        },
        REMOVE_FAVOURITE(cityName) {
            store.state.favourites = store.state.favourites.filter(fav => fav !== cityName);
            this.saveFavouritesToLocalStorage();
        },
        SET_FAVOURITES(favourites) {
            store.state.favourites = favourites;
            this.saveFavouritesToLocalStorage();
        },
        saveFavouritesToLocalStorage() {
            localStorage.setItem('favourites', JSON.stringify(store.state.favourites));
        }
    },

    actions: {
        async fetchWeatherData(cityName) {
            store.mutations.SET_LOADING(true);
            store.mutations.SET_ERROR(null);

            try {
                const geoResponse = await axios.get(`${store.geocodeUrl}&q=${cityName}&limit=1`);
                if (!geoResponse.data.length) {
                    throw new Error('Insert your position');
                }

                const { lat, lon } = geoResponse.data[0];
                const weatherUrl = `${store.apiUrl}?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_API_KEY}`;

                const weatherResponse = await axios.get(weatherUrl);
                store.mutations.SET_WEATHER_DATA(weatherResponse.data);

            } catch (error) {
                store.mutations.SET_ERROR(error.message || 'Failed to fetch weather data');
            } finally {
                store.mutations.SET_LOADING(false);
            }
        },

        async fetchWeatherByLocation(lat, lon) {
            store.mutations.SET_LOADING(true);
            store.mutations.SET_ERROR(null);

            try {
                const weatherUrl = `${store.apiUrl}?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_API_KEY}`;
                const weatherResponse = await axios.get(weatherUrl);

                store.mutations.SET_WEATHER_DATA(weatherResponse.data);
                store.mutations.SET_CITY_NAME('Your position');

            } catch (error) {
                store.mutations.SET_ERROR(error.message || 'Failed to fetch weather data');
            } finally {
                store.mutations.SET_LOADING(false);
            }
        },

        initializeWeather() {
            const cityName = localStorage.getItem('cityName');
            if (cityName) {
                store.actions.fetchWeatherData(cityName);
            }
        }
    },
});

store.actions.initializeWeather();
