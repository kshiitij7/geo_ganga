<template>
<div class="Basin">
    <v-main>
        <!-- Left Side Bar -->
        <v-navigation-drawer rail app color="black">
            <v-list>
                <!-- Layers Button -->
                <v-list-item @click="openLeftDrawer('layers')" class="cursor-pointer">
                    <v-tooltip location="left">
                        <template v-slot:activator="{ props: tooltip }">
                            <v-icon v-bind="tooltip">mdi-layers</v-icon>
                        </template>
                        <span>Layers</span>
                    </v-tooltip>
                </v-list-item>
                <v-divider :thickness="2" color="white"></v-divider>
                <!-- Time Series Button -->
                <v-list-item @click="openLeftDrawer('timeSeries')" class="cursor-pointer">
                    <v-tooltip location="left">
                        <template v-slot:activator="{ props: tooltip }">
                            <v-icon v-bind="tooltip">mdi-chart-timeline</v-icon>
                        </template>
                        <span>Time Series</span>
                    </v-tooltip>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <!-- Dynamic Drawer -->
        <v-navigation-drawer v-model="leftDrawer" location="left" :width="250" color="white">
            <!-- Layers Content -->
            <template v-if="activeLeftTab === 'layers'">
                <v-list-item>
                    <div class="text-h6 font-weight-bold" style="text-align: center;">Layer Switcher</div>
                </v-list-item>
                <v-divider :thickness="2" color="black"></v-divider>
                <v-title>
                    <div class="text-h7 font-weight-bold" style="margin-top: 20px; margin-left: 20px;">Base Maps</div>
                </v-title>
                <v-select v-model="baseMaps" :items="baseMapsLayers" label="Please Select a Layer" required></v-select>
                <v-title>
                    <div class="text-h7 font-weight-bold" style="margin-top: 20px; margin-left: 20px;">Administrative Boundaries</div>
                </v-title>
                <v-select clearable chips multiple v-model="adminBoundary" :items="adminBoundaryLayers" label="Please Select a Layer" required></v-select>
            </template>

            <!-- Time Series Content -->
            <template v-if="activeLeftTab === 'timeSeries'">
                <v-list-item> <div class="text-h5 font-weight-bold" style="text-align: center;">Time Series Data</div>
                </v-list-item>
                <v-divider :thickness="2" color="black"></v-divider>
                <v-select v-model="timeSeries" :items="timeSeriesLayers" label="Please Select an Option" required ></v-select>
            </template>
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
                                    <v-col cols="12" class="text-center">
                                        <v-text-field clearable placeholder="Type to Search ..."></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                    </v-card>
                </v-menu>

                <v-divider :thickness="2" color="white"></v-divider>

                <!-- FeatureInfo Button -->
                <v-list-item @click="toggleFeatureInfoBox" ref="infoButton">
                    <v-list-item-title>
                        <v-tooltip location="right">
                            <template v-slot:activator="{ props: tooltip }">
                                <v-icon v-bind="tooltip">mdi-information</v-icon>
                            </template>
                            <span>Feature Info</span>
                        </v-tooltip>
                    </v-list-item-title>
                </v-list-item>
                <v-menu v-model="isInfoBoxOpen" :close-on-content-click="false" :activator="infoActivator" offset-y max-width="300">
                    <v-card>
                        <v-card-title><span class="text-h6">Feature Info Tool</span></v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                            <v-switch color="blue" label="Enable Feature Info"></v-switch>
                        </v-card-text>
                    </v-card>
                </v-menu>

                <v-divider :thickness="2" color="white"></v-divider>

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
                <v-menu v-model="isMeasurementBoxOpen" persistent :activator="measureActivator" offset-y max-width="300">
                    <v-card>
                        <v-card-title><span class="text-h6">Measurement Tool</span> </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                            <v-container class="icon-container" justify="center">
                                <v-row justify="center">
                                    <v-col cols="4" class="text-center">
                                        <v-btn prepend-icon="mdi-pulse" stacked @click="activateMeasurement('Length')">Length</v-btn>
                                    </v-col>
                                    <v-col cols="4" class="text-center">
                                        <v-btn prepend-icon="mdi-pentagon-outline" stacked @click="activateMeasurement('Area')">Area</v-btn>
                                    </v-col>
                                    <v-col cols="4" class="text-center">
                                        <v-btn color="#700B0B" prepend-icon="mdi-delete" stacked @click="clearMeasurements">Clear</v-btn>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                    </v-card>
                </v-menu>

                <v-divider :thickness="2" color="white"></v-divider>

                <!-- Compare Button -->
                <v-list-item>
                    <v-list-item-title @click="toggleCompareDrawer" class="cursor-pointer">
                        <v-tooltip location="right">
                            <template v-slot:activator="{ props: tooltip }">
                                <v-icon v-bind="tooltip">mdi-compare</v-icon>
                            </template>
                            <span>Compare Tool</span>
                        </v-tooltip>
                    </v-list-item-title>
                </v-list-item>

                <v-divider :thickness="2" color="white"></v-divider>
            </v-list>

        </v-navigation-drawer>

        <!-- Compare Drawer -->
        <v-navigation-drawer v-model="compare" location="right" :width="300">
            <v-list-item>
                <div class="text-h5 font-weight-bold" style="text-align: center;">Comparison Tool</div>
            </v-list-item>
            <v-divider :thickness="2" color="black"></v-divider>
            <v-title>
                <div class="text-h6 font-weight-bold" style="margin-top: 20px; margin-left: 20px;">Left Side</div>
            </v-title>
            <v-select v-model="leftSelect" :items="leftMonths" :rules="[v => !!v || 'Month is required']" label="Please Select a Layer" required></v-select>
            <v-title>
                <div class="text-h6 font-weight-bold" style="margin-top: 20px; margin-left: 20px;">Right Side</div>
            </v-title>
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
            leftDrawer: false,
            activeLeftTab: null,
            baseMaps: null,
            adminBoundary: null,
            timeSeries:null,
            baseMapsLayers: ['Bing', 'Open Street Map', 'Bhuvan Satellite Imagery'],
            adminBoundaryLayers: ['Ganga Basin','State Boundary', 'District Boundary', 'Sub-District Boundary'],
            timeSeriesLayers: ['Evapotranspiration', 'Precipitation', 'Temperature'],
            isInfoBoxOpen: false,
            infoActivator: null,
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
        openLeftDrawer(leftTab) {
            this.activeLeftTab = leftTab;
            this.leftDrawer = !this.leftDrawer;
        },
        toggleFeatureInfoBox() {
            if (!this.infoActivator) {
                this.infoActivator = this.$refs.infoButton;
            }
            this.isInfoBoxOpen = !this.isInfoBoxOpen;
        },
        toggleMeasurementBox() {
            if (!this.measureActivator) {
                this.measureActivator = this.$refs.measureButton; 
            }
            this.isMeasurementBoxOpen = true;
        },
        activateMeasurement(type) {
            eventBus.emit('set-measurement-mode', type);
            this.isMeasurementBoxOpen = true;
        },
        clearMeasurements() {
            eventBus.emit('clear-measurements');
            this.isMeasurementBoxOpen = true;
        },
        toggleSearchBox() {
            if (!this.searchActivator) {
                this.searchActivator = this.$refs.searchButton;
            }
            this.isSearchBoxOpen = !this.isSearchBoxOpen;
        },
        toggleCompareDrawer() {
            this.compare = !this.compare
        },
        handleCompare() {
            if (!this.showError) {
                alert('Comparison started!');
            }
        },

    },
};
</script>

<style scoped>

</style>
