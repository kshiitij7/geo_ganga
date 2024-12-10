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
                <v-list-item @click="toggleSearchBox" ref="searchButton">
                    <v-list-item-title>
                        <v-tooltip location="right">
                            <template v-slot:activator="{ props: tooltip }">
                        <v-icon v-bind="tooltip">mdi-magnify</v-icon>
                    </template>
                    <span>Search</span>
                    </v-tooltip>
                    </v-list-item-title>
                </v-list-item>
                <v-menu v-model="isSearchBoxOpen" :close-on-content-click="false" :activator="searchActivator" width="300">               
                    <v-card>
                        <v-card-title> <span class="text-h6">Search for a place</span></v-card-title>
                        <v-card-text>
                            <v-container class="icon-container" justify="center">
                                <v-row justify="center">
                                    <v-col cols="12" class="text-center"> <v-text-field clearable placeholder="Type to Search ..."></v-text-field> </v-col>                                   
                                </v-row>
                            </v-container>
                        </v-card-text>
                    </v-card>
                    </v-menu>

                    <!-- FeatureInfo Button -->
                <v-list-item :style="{ color: isFeatureInfoActive ? 'green' : '' }" @click="toggleFeatureInfo">
                    <v-list-item-title>
                        <v-tooltip location="right">
                            <template v-slot:activator="{ props: tooltip }">
                        <v-icon v-bind="tooltip">mdi-information</v-icon>
                    </template>
                    <span>Feature Info</span>
                    </v-tooltip>
                    </v-list-item-title>
                </v-list-item>

                    <!-- Measure Button -->
                <v-list-item @click="toggleMeasurementBox" ref="measureButton">
                    <v-list-item-title>
                        <v-tooltip location="right">
                            <template v-slot:activator="{ props: tooltip }">
                        <v-icon v-bind="tooltip">mdi-ruler-square</v-icon>
                    </template>
                    <span>Measurement Tool</span>
                    </v-tooltip>
                    </v-list-item-title>
                </v-list-item>
                <v-menu v-model="isMeasurementBoxOpen" :close-on-content-click="false" :activator="measureActivator" offset-y max-width="300">
                    <v-card>
                        <v-card-title><span class="text-h6">Measurement Tool</span> </v-card-title>
                        <v-card-text>
                            <v-container class="icon-container" justify="center">
                                <v-row justify="center">
                                    <v-col cols="4" class="text-center"><v-btn prepend-icon="mdi-pulse" stacked>Length</v-btn></v-col>
                                    <v-col cols="4" class="text-center"><v-btn prepend-icon="mdi-pentagon-outline" stacked>Area</v-btn></v-col>
                                    <v-col cols="4" class="text-center"><v-btn color="#700B0B" prepend-icon="mdi-delete" stacked>Clear</v-btn></v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                    </v-card>
                </v-menu>

                <!-- Compare Button -->
                <v-list-item >
                    <v-list-item-title @click="toggleCompareDrawer" class="cursor-pointer">
                        <v-tooltip location="right">
                            <template v-slot:activator="{ props: tooltip }">
                        <v-icon v-bind="tooltip">mdi-compare</v-icon>
                    </template>
                    <span>Compare Tool</span>
                    </v-tooltip>
                    </v-list-item-title>
                </v-list-item>

            </v-list>
        </v-navigation-drawer>

        <!-- Compare Drawer -->
        <v-navigation-drawer v-model="compare" location="right" :width="300">
                    <v-list-item><div class="text-h4 font-weight-bold">Comparison Tool</div></v-list-item>

                    <v-divider :thickness="5" color="black"></v-divider> 

                    <v-title>Left Side</v-title>
                    <v-select v-model="leftSelect" :items="leftMonths" :rules="[v => !!v || 'Month is required']" label="Please Select a Layer" required></v-select>

                    <v-title>Right Side</v-title>
                    <v-select v-model="rightSelect" :items="rightMonths" :rules="[v => !!v || 'Month is required']" label="Please Select a Layer" required></v-select>
                    <div v-if="showError" class="text-red text-caption mt-2">Please select different months.</div>
                    <v-btn :color="isBothSelected && !showError ? 'green' : 'black'" :disabled="!isBothSelected || showError" @click="handleCompare">Compare</v-btn>                  
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
            measureActivator: null,
            searchActivator: null,
            compare: false,
            leftSelect: null,
            rightSelect: null,
            leftMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            rightMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        };
    },
    computed: {
        isBothSelected() {
            return this.leftSelect && this.rightSelect; 
        },
        showError() {
        return this.leftSelect === this.rightSelect;
    },
    },
    methods: {
        toggleFeatureInfo() {
            this.isFeatureInfoActive = !this.isFeatureInfoActive;
            eventBus.emit('toggle-feature-info', this.isFeatureInfoActive);
        },
        toggleMeasurementBox() {
            if (!this.activator) {
                this.measureActivator = this.$refs.measureButton;
            }
            this.isMeasurementBoxOpen = !this.isMeasurementBoxOpen;
        },
        toggleSearchBox() {
            if (!this.activator) {
                this.searchActivator = this.$refs.searchButton;
            }
            this.isSearchBoxOpen = !this.isSearchBoxOpen;
        },
        toggleCompareDrawer(){
            this.compare = !this.compare
        },
        handleCompare() {
        if (!this.showError) {
            // Perform the comparison logic here
            alert('Comparison started!');
        }
    },

    },
};
</script>

<style scoped>

</style>
