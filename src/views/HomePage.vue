<template>
    
    <v-main class="slider-container">
        
        <v-img :src="logo" class="logo-image"></v-img> 
    </v-main>

  </template>

<script>
export default {
    name: 'HomePage',
    data() {
        return {
            logo: require('@/assets/img/ganga_logo.png'),
           
        }
    }
};
</script>

<style scoped>
.slider-container{
    background-color: white;
}

.logo-image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 1800px; /* Adjust size as needed */
}
</style>