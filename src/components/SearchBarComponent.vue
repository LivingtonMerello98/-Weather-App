<script>
import axios from 'axios';
import { store } from '../store';

export default{
    data() {
        return{
            name: 'SearchBarComponent',
            results : [],
        }
    },
    methods:{
        tryApi(){
            axios.get(`${store.apiUrl}${store.roma}`)
            .then(response => {
                // console.log('Response completa:', response); // Log della risposta completa
                this.results = response.data || []; // Utilizza || per gestire eventuali errori
                console.log(this.results)
            })
            .catch(error => {
            console.error('Errore durante la chiamata', error);
            });
        }
    },
    mounted(){
        console.log('l applicativo è avviato')
        this.tryApi()
    }
}
</script>


<template>
    <div class="input-group input-group-sm mb-3">
        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
        <span class="input-group-text" id="inputGroup-sizing-sm">cerca</span>
    </div>
</template>

<style lang="scss" scoped>

</style>