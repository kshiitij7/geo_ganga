<template>
<v-app-bar app color="white" dark class="button-bar" height="50" elevation="1">
    
    <v-row class="fill-height" align="center" justify="space-between"></v-row>
    <v-divider :thickness="1" color="black" vertical></v-divider>
    <v-img :src="logo" class="logo-image" max-width="150"></v-img>
    <v-divider :thickness="1" color="black" vertical></v-divider>
    
    <router-link to="/">
        <v-btn :class="{'active': isActive('/')}" >
            <v-icon left>mdi-home</v-icon> Home
        </v-btn>
    </router-link>

    <v-divider :thickness="1" color="black" vertical></v-divider>

    <router-link to="/about">
        <v-btn :class="{'active': isActive('/about')}">
            <v-icon left>mdi-information</v-icon> About
        </v-btn>
    </router-link>

    <v-divider :thickness="1" color="black" vertical></v-divider>

    <router-link to="/basin">
        <v-btn :class="{'active': isActive('/basin')}">
            <v-icon left>mdi-leaf</v-icon> GangaBasin
        </v-btn>
    </router-link>

    <v-divider :thickness="1" color="black" vertical></v-divider>

    <router-link to="/quality">
    <v-btn :class="{'active': isActive('/quality')}">
        <v-icon left>mdi-water-check</v-icon> WaterQuality
    </v-btn>
    </router-link>

    <v-divider :thickness="1" color="black" vertical></v-divider>

    <v-btn :class="{'active': isActive('/tab3')}">
        <v-icon left>mdi-star</v-icon> Tab 3
    </v-btn>
    <v-divider :thickness="1" color="black" vertical></v-divider>
    <v-btn :class="{'active': isActive('/tab3')}">
        <v-icon left>mdi-cloud</v-icon> Tab 4
    </v-btn>
    <v-divider :thickness="1" color="black" vertical></v-divider>

    <v-img :src="nmcg"  max-width="150" />
    <v-divider :thickness="1" color="black" vertical></v-divider>
    <v-spacer></v-spacer>
</v-app-bar>
</template>

  
  
<script>
export default {
    name: 'NavBarMain',

    data() {
        return {
            nmcg:require('@/assets/img/nmcgGif.gif'),     
            logo: require('@/assets/img/ganga_logo.png'),
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
