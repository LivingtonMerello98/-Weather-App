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
    <header>
       <div>
          <div>
             <div>
             </div>

             <div >
                <!-- componente search-bar -->
                <SearchBarComponent/>
                
             </div>

          </div>
       </div>
    </header>
 </template>

<style lang="scss" scoped></style>