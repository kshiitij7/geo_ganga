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
  
            <v-list-item :style="{ color: isMeasurementActive ? 'red' : '' }" @click="toggleDialog">
              <v-list-item-title>
                <v-icon>mdi-ruler-square</v-icon>
              </v-list-item-title>
            </v-list-item>
  
            <!-- The dialog box -->
            <v-dialog v-model="isDialogVisible" content-class="dialog-content" persistent max-width="200" @click:outside="isDialogVisible = false">
              <v-card>
                <v-card-title>Select </v-card-title>
                <v-card-text v-if="isMeasurementActive">
                  <v-radio-group v-model="selectedMeasurementMode" @change="updateMeasurementMode">
                    <v-radio label="Measure Length" value="Length"></v-radio>
                    <v-radio label="Measure Area" value="Area"></v-radio>
                  </v-radio-group>
                </v-card-text>
              </v-card>
            </v-dialog>
  
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
        isMeasurementActive: false,
        selectedMeasurementMode: '',
        isDialogVisible: false,
        selectedOption: null,
      };
    },
    methods: {
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
      toggleDialog() {
        this.isMeasurementActive = !this.isMeasurementActive;
        this.isDialogVisible = true;
      },
      
    
    },
  };
  </script>
  
  <style scoped>
  .v-text-field {
    transition: all 0.3s ease;
  }
  </style>
  