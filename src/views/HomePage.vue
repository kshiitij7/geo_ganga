<template>
<v-main>
    <v-container class="d-flex justify-center align-center" style="min-height: 70vh;">
        <v-img  :src="logo"></v-img>

    </v-container>
</v-main>
</template>

<script>
export default {
    name: 'HomePage',
    data() {
        return {
            logo: require('@/assets/img/ganga_logo.png'),
            video: require('@/assets/img/videoplayback.mp4')
        }
    }
};
</script>
