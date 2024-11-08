import { reactive } from 'vue';

export const store = reactive({
    apiUrl: import.meta.env.VITE_API_URL,
    geocodeUrl: `${import.meta.env.VITE_GEOCODE_URL}?appid=${import.meta.env.VITE_API_KEY}`,
});
