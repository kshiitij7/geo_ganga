<template>
<div class="Basin">
    <v-main>
        <v-navigation-drawer rail app color="black">
            <v-list>
                <v-list-item>
                    <v-list-item-title>
                        <v-icon>mdi-layers </v-icon>
                    </v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>
                        <v-icon>mdi mdi-chart-timeline</v-icon>
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <!-- Map -->
        <div ref="basinRef" style="width: 100%; height: 100vh;">
            <BasinComponent />
        </div>

        <v-navigation-drawer rail app location="right" color="black">
            <v-list>
                <!-- Search Button -->
                <v-list-item>
                    <v-list-item-title>
                        <v-icon>mdi-magnify</v-icon>
                    </v-list-item-title>
                </v-list-item>

                <v-list-item :style="{ color: isFeatureInfoActive ? 'blue' : '' }" @click="toggleFeatureInfo">
                    <v-list-item-title>
                        <v-icon>mdi-information</v-icon>
                    </v-list-item-title>
                </v-list-item>

                <v-list-item @click="toggleMeasurementBox" ref="measureButton">
                    <v-list-item-title><v-icon>mdi-ruler-square</v-icon></v-list-item-title>
                </v-list-item>
                <v-menu v-model="isMeasurementBoxOpen" :close-on-content-click="false" :activator="activator" offset-y max-width="300">
                    <v-card>
                        <v-card-title>
                            <span class="text-h6">Measurement Tool</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container class="icon-container" justify="center">
                                <v-row justify="center">
                                    <v-col cols="4" class="text-center"><v-btn prepend-icon="mdi-pulse" stacked>Length</v-btn></v-col>
                                    <v-col cols="4" class="text-center"> <v-btn prepend-icon="mdi-pentagon-outline" stacked>Area</v-btn></v-col>
                                     <v-col cols="4" class="text-center"> <v-btn color="#700B0B" prepend-icon="mdi-delete" stacked>Clear</v-btn></v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                    </v-card>
                </v-menu>

                <v-list-item>
                    <v-list-item-title>
                        <v-icon>mdi mdi-gesture-swipe</v-icon>
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </v-main>
</div>
</template>

<script>
import BasinComponent from '../GangaBasin/BasinComponent.vue';
import eventBus from '@/event-bus';

export default {
    name: 'BasinPage',
    components: {
        BasinComponent,
    },
    data() {
        return {
            isFeatureInfoActive: false,
            isMeasurementBoxOpen: false,
            activator: null,
        };
    },
    methods: {
        toggleFeatureInfo() {
            this.isFeatureInfoActive = !this.isFeatureInfoActive;
            eventBus.emit('toggle-feature-info', this.isFeatureInfoActive);
        },
        toggleMeasurementBox() {
            if (!this.activator) {
                this.activator = this.$refs.measureButton;
            }
            this.isMeasurementBoxOpen = !this.isMeasurementBoxOpen;
        },

    },
};
</script>

<style scoped>

</style>
