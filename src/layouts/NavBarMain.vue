<template>
<v-app-bar app color="white" dark class="button-bar" height="50" elevation="1">
    <v-img :src="gangalogo" class="GangaLogo" max-width="200" />

    <router-link to="/">
        <v-btn>
            <v-icon left>mdi-home</v-icon> Home
        </v-btn>
    </router-link>

    <router-link to="/about">
        <v-btn>
            <v-icon left>mdi-information</v-icon> About
        </v-btn>
    </router-link>
    
    <router-link to="/basin">
        <v-btn>
            <v-icon left>mdi-map</v-icon> GangaBasin
        </v-btn>
    </router-link>
    <v-btn>
        <v-icon left>mdi-heart</v-icon> Tab 2
    </v-btn>
    <v-btn>
        <v-icon left>mdi-star</v-icon> Tab 3
    </v-btn>

</v-app-bar>
</template>

<script>
export default {
    name: 'NavBarMain',

    data() {
        return {
            gangalogo: require('@/assets/img/ganga_logo.png'),
            menu: false
        }
    }
}
</script>
