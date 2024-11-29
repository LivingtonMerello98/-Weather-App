import { reactive } from 'vue';
import axios from 'axios';


//esportazione store reattivo
export const store = reactive({


    apiUrl: import.meta.env.VITE_API_URL,
    geocodeUrl: `${import.meta.env.VITE_GEOCODE_URL}?appid=${import.meta.env.VITE_API_KEY}`,

    //state, getter, mutator e action vengono utilizzati/chiamati dai componenti

    //state contiene dati/variabili globali dell app.
    state: {
        loading: false,    //flag di caricamento
        weatherData: null, // var x dati del meteo
        error: null,       // var x mex. di err
        cityName: localStorage.getItem('cityName') || '', // Recupera la città dal localStorage || stringa vuota
        isMenuVisible: false, // flag x per la visibilità del menu
        favourites: JSON.parse(localStorage.getItem('favourites')) || [], // Carica i preferiti da localStorage
    },

    //metodi getters permettono di ottenere i dati dello state.
    getters: {

        //restit. il mex di errore presente nei data
        errorMessage() {
            return store.state.error;
        },

        //restit. il valore booleano in loading presente nei data
        isLoading() {
            return store.state.loading;
        },

        //restit. hourly se è presente usando chaining op (?) oppure restit.[]
        hourlyWeather() {
            return store.state.weatherData?.hourly || [];
        },

        //restit. current se è presente usando chaining op (?) oppure restit.[]
        currentWeather() {
            return store.state.weatherData?.current || null;
        },

        //restit. daily se è presente usando chaining op (?) oppure restit.[]
        dailyWeather() {
            return store.state.weatherData?.daily || [];
        },

        //restit. il valore di cityName presente nei data (local storage)
        cityName() {
            return store.state.cityName;
        },

        //restit. favourites presente nei data
        favourites() {
            return store.state.favourites;
        }
    },

    //metodi mutator permettono di modificar i dati dello state. 
    mutations: {

        //update state.weatherData con il parametro passato alla funzione
        SET_WEATHER_DATA(data) {
            store.state.weatherData = data;
        },

        //update state.loading con il parametro pasato alla funzione (true/false)
        SET_LOADING(isLoading) {
            store.state.loading = isLoading;
        },

        //update state.cityName e local storage con parametro passato alla funzione
        SET_CITY_NAME(cityName) {
            store.state.cityName = cityName;
            localStorage.setItem('cityName', cityName); // Salva la città nel localStorage
        },

        //upd state.error con parametro passato alla funzione
        SET_ERROR(error) {
            store.state.error = error;
        },

        //upd state.isMenuVisible (cambio da true a false)
        TOGGLE_MENU() {
            store.state.isMenuVisible = !store.state.isMenuVisible;
        },

        //upd state.isMenuVisible in false x chiudere menu
        CLOSE_MENU() {
            store.state.isMenuVisible = false;
        },

        //metodo x aggiungere alla lista favoriti il parametro passato alla funzione
        // - Se non è già incluso nei favoriti allora viene inserito e salvato nel local storage
        ADD_FAVOURITE(cityName) {
            if (!store.state.favourites.includes(cityName)) {
                store.state.favourites.push(cityName);
                this.saveFavouritesToLocalStorage();
            }

        },

        // Rimuove una città dall'elenco dei preferiti
        // - Filtra l'array `state.favourites` per escludere la città specificata (`cityName`)
        // - Aggiorna il localStorage per riflettere le modifiche
        REMOVE_FAVOURITE(cityName) {
            store.state.favourites = store.state.favourites.filter(favourite => favourite !== cityName);
            this.saveFavouritesToLocalStorage();
        },

        // Imposta un nuovo elenco di preferiti
        // - Aggiorna `state.favourites` con il parametro passato (`favourites`)
        // - Salva il nuovo elenco nel localStorage
        SET_FAVOURITES(favourites) {
            store.state.favourites = favourites;
            this.saveFavouritesToLocalStorage();
        },

        // Salva l'elenco dei preferiti nel localStorage
        // - Converte `state.favourites` in formato JSON
        // - Memorizza il valore nel localStorage con la chiave `favourites`
        saveFavouritesToLocalStorage() {
            localStorage.setItem('favourites', JSON.stringify(store.state.favourites));
        }
    },

    actions: {
        // funzione asincrona per recuperare i dati meteo basati sul nome della città
        async fetchWeatherData(cityName) {
            // imposta lo stato di caricamento a true e resetta eventuali errori precedenti
            store.mutations.SET_LOADING(true);
            store.mutations.SET_ERROR(null);

            try {
                // effettua una richiesta per ottenere le coordinate geografiche della città
                const geoResponse = await axios.get(`${store.geocodeUrl}&q=${cityName}&limit=1`);

                // controlla se non sono stati trovati dati per la città fornita
                if (!geoResponse.data.length) {
                    throw new Error('Insert your position'); // lancia un errore personalizzato
                }

                // estrae latitudine e longitudine dalla risposta
                const { lat, lon } = geoResponse.data[0];

                // costruisce l'url per richiedere i dati meteo usando le coordinate
                const weatherUrl = `${store.apiUrl}?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_API_KEY}`;

                // effettua una richiesta per ottenere i dati meteo
                const weatherResponse = await axios.get(weatherUrl);

                // aggiorna lo stato globale con i dati meteo ricevuti
                store.mutations.SET_WEATHER_DATA(weatherResponse.data);

            } catch (error) {
                // imposta un messaggio di errore nello stato globale
                store.mutations.SET_ERROR(error.message || 'Failed to fetch weather data');
            } finally {
                // imposta lo stato di caricamento a false, indipendentemente dall'esito
                store.mutations.SET_LOADING(false);
            }
        },

        // funzione asincrona per recuperare i dati meteo basati sulle coordinate geografiche
        async fetchWeatherByLocation(lat, lon) {
            // imposta lo stato di caricamento a true e resetta eventuali errori precedenti
            store.mutations.SET_LOADING(true);
            store.mutations.SET_ERROR(null);

            try {
                // costruisce l'url per richiedere i dati meteo usando latitudine e longitudine
                const weatherUrl = `${store.apiUrl}?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_API_KEY}`;

                // effettua una richiesta per ottenere i dati meteo
                const weatherResponse = await axios.get(weatherUrl);

                // aggiorna lo stato globale con i dati meteo ricevuti
                store.mutations.SET_WEATHER_DATA(weatherResponse.data);

                // aggiorna il nome della città nello stato globale con un valore predefinito
                store.mutations.SET_CITY_NAME('Your position');

            } catch (error) {
                // imposta un messaggio di errore nello stato globale
                store.mutations.SET_ERROR(error.message || 'Failed to fetch weather data');
            } finally {
                // imposta lo stato di caricamento a false, indipendentemente dall'esito
                store.mutations.SET_LOADING(false);
            }
        },

        // funzione per inizializzare i dati meteo caricando il nome della città dalla memoria locale
        initializeWeather() {
            // recupera il nome della città salvato nel localStorage
            const cityName = localStorage.getItem('cityName');

            // se il nome della città è disponibile, richiama la funzione per recuperare i dati meteo
            if (cityName) {
                store.actions.fetchWeatherData(cityName);
            }
        }
    },

});

store.actions.initializeWeather();
