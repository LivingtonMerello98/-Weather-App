import axios from 'axios';
import { reactive } from 'vue';

export const store = reactive({

    apiUrl: import.meta.env.VITE_API_URL, //vite e non process per gli ambienti di sviluppo in vite

    // cities
    roma: 'forecast?latitude=41.9028&longitude=12.4964&current_weather=true',

})
