<template>
<div class="Basin">
    <v-app-bar app color="#022a38" dark class="button-bar" height="40" elevation="2">
        <!-- LeftMenuButton -->
        <v-btn color="white" elevation="3" @click="toggleLeftDrawer">
            <v-icon>mdi-menu</v-icon>Left
        </v-btn>
        <v-spacer></v-spacer>
        <!-- RightMenuButton -->
        <v-btn color="white" elevation="3" @click="toggleRightDrawer">
            <v-icon>mdi-menu</v-icon>Right
        </v-btn>
    </v-app-bar>

    <v-main>
        <!-- Left Drawer -->
        <v-navigation-drawer v-model="leftdrawer" location="left" app width="300" color="">
            <v-list>
                <!-- Base Maps -->
                <v-list-item @click="toggleBaseMaps = !toggleBaseMaps">
                    <v-btn color="#022a38" block>
                        <v-list-item-content>
                            <v-list-item-title>Base Maps </v-list-item-title>
                        </v-list-item-content>
                    </v-btn>
                </v-list-item>
                <v-expansion-panels v-if="toggleBaseMaps">
                    <v-expansion-panel>
                        <v-expansion-panel-content>
                            <v-checkbox v-model="bing" label="Bing Map"></v-checkbox>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-content>
                            <v-checkbox v-model="bhuvan" label="Bhuvan Satellite Imagery"></v-checkbox>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-content>
                            <v-checkbox v-model="osm" label="Open Street Map"></v-checkbox>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>

                <!-- Admin Boundary -->
                <v-list-item @click="toggleAdminBoundary = !toggleAdminBoundary">
                    <v-btn color="#022a38" block>
                        <v-list-item-content>
                            <v-list-item-title>Administrative Boundaries </v-list-item-title>
                        </v-list-item-content>
                    </v-btn>
                </v-list-item>
                <v-expansion-panels v-if="toggleAdminBoundary">
                    <v-expansion-panel>
                        <v-expansion-panel-content>
                            <v-checkbox v-model="state" label="States"></v-checkbox>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-content>
                            <v-checkbox v-model="district" label="Districts"></v-checkbox>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-content>
                            <v-checkbox v-model="subdistrict" label="Sub-districts"></v-checkbox>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>

            </v-list>

        </v-navigation-drawer>

        <!-- Map -->
        <div ref="basinRef" style="width: 100%; height: 100vh;">
            <BasinComponent />
        </div>

        <!-- Right Drawer -->
        <v-navigation-drawer v-model="rightdrawer" location="right" app width="220" color="">
            <v-list>
                <!-- Search Button and Input -->
                <v-list-item>
                    <v-btn class="text-start" color="#022a38" @click="toggleSearch">
                        <v-icon left>mdi-magnify</v-icon> Search
                    </v-btn>
                </v-list-item>
                <v-list-item v-if="showSearchInput">
                    <v-text-field v-model="searchQuery" placeholder="Type your search" dense></v-text-field>
                </v-list-item>
                <!-- Feature Info -->
                <v-list-item>
                    <v-btn class="text-start" :color="isFeatureInfoActive ? 'blue' : '#022a38'" @click="toggleFeatureInfo">
                        <v-icon left>mdi-information</v-icon> Feature Info
                    </v-btn>
                </v-list-item>
                <!-- Measurement -->
                <v-list-item>
                    <v-btn class="text-start" :color="isMeasurementActive ? '#860505' : '#022a38'" @click="toggleMeasurement">
                        <v-icon left>mdi-ruler</v-icon> {{ isMeasurementActive ? 'Stop Measuring' : 'Measure' }}
                    </v-btn>
                </v-list-item>
                <v-list-item v-if="isMeasurementActive">
                    <v-radio-group v-model="selectedMeasurementMode" @change="updateMeasurementMode" row>
                        <v-radio label="Measure Length" value="Length" />
                        <v-radio label="Measure Area" value="Area" />
                    </v-radio-group>
                </v-list-item>
                <!-- Swipe -->
                <v-list-item>
                    <v-btn class="text-start" color="#022a38">
                        <v-icon left>mdi-gesture-swipe</v-icon> Swipe
                    </v-btn>
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
            leftdrawer: false,
            rightdrawer: false,
            showSearchInput: false,
            searchQuery: '',
            isFeatureInfoActive: false,
            isMeasurementActive: false,
            selectedMeasurementMode: '',
            toggleBaseMaps: false,
            bing: false,
            bhuvan: false,
            osm: false,
            toggleAdminBoundary: false,
            state: false,
            district: false,
            subdistrict: false,
        };
    },
    methods: {
        toggleLeftDrawer() {
            this.leftdrawer = !this.leftdrawer;
        },
        toggleRightDrawer() {
            this.rightdrawer = !this.rightdrawer;
        },
        toggleSearch() {
            this.showSearchInput = !this.showSearchInput;
        },
        toggleFeatureInfo() {
            this.isFeatureInfoActive = !this.isFeatureInfoActive;
            eventBus.emit('toggle-feature-info', this.isFeatureInfoActive);
        },
        toggleMeasurement() {
            this.isMeasurementActive = !this.isMeasurementActive;
            if (!this.isMeasurementActive) {
                this.selectedMeasurementMode = '';
            }
            eventBus.emit('toggle-measurement', this.isMeasurementActive);
            this.updateMeasurementMode();
        },
        updateMeasurementMode() {
            eventBus.emit('set-measurement-mode', this.selectedMeasurementMode);
        },
    },
};
</script>

<style scoped>

</style>
