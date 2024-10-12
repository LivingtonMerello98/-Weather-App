<script>

import SearchBarComponent from './SearchBarComponent.vue';

export default{
    data(){
        return{
            name: 'HeaderComponent'
        };
    },

    components:{
        SearchBarComponent
    }
}

</script>

<template>
    <header class="p-3 bg-dark text-white">
       <div class="container">
          <div class="row">
             <div class="col-md-6">
             </div>

             <div class="col-md-6">
                <!-- componente search-bar -->
                <SearchBarComponent/>
                
             </div>

          </div>
       </div>
    </header>
 </template>

<style lang="scss" scoped></style>