<template>
<v-app-bar app color="white" dark class="button-bar" height="50" elevation="1">
    <v-img :src="nmcg" class="GangaLogo" max-width="200" />

    <v-divider :thickness="2" color="black" vertical></v-divider>
    
    <router-link to="/" exact-active-class="active-link">
        <v-btn :class="{'active': isActive('/')}" >
            <v-icon left>mdi-home</v-icon> Home
        </v-btn>
    </router-link>

    <v-divider :thickness="2" color="black" vertical></v-divider>

    <router-link to="/about" exact-active-class="active-link">
        <v-btn :class="{'active': isActive('/about')}">
            <v-icon left>mdi-information</v-icon> About
        </v-btn>
    </router-link>

    <v-divider :thickness="2" color="black" vertical></v-divider>

    <router-link to="/basin" exact-active-class="active-link">
        <v-btn :class="{'active': isActive('/basin')}">
            <v-icon left>mdi-map</v-icon> GangaBasin
        </v-btn>
    </router-link>

    <v-divider :thickness="2" color="black" vertical></v-divider>

    <router-link to="/quality" exact-active-class="active-link">
    <v-btn :class="{'active': isActive('/quality')}">
        <v-icon left>mdi-water-check</v-icon> WaterQuality
    </v-btn>
    </router-link>

    <v-divider :thickness="2" color="black" vertical></v-divider>

    <!-- <v-btn :class="{'active': isActive('/tab3')}">
        <v-icon left>mdi-star</v-icon> Tab 3
    </v-btn>

    <v-divider :thickness="2" color="black" vertical></v-divider> -->

</v-app-bar>
</template>

  
  
<script>
export default {
    name: 'NavBarMain',

    data() {
        return {
            nmcg:require('@/assets/img/nmcgGif.gif'),     
        }
    },

    methods: {
        isActive(route) {
            return this.$route.path === route;
        }
    }
}
</script>
  
  
<style scoped>
.active {
    height: 60px;   
    color: rgb(172, 9, 9);
}
</style>
