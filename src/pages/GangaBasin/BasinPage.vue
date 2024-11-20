<template>
    <div class = "Basin">
    <v-app-bar app color="blue" dark class="button-bar" height="40" elevation="2">
      
      <v-btn @click="toggleLeftDrawer">
        <v-icon>mdi-menu</v-icon> Left
      </v-btn>
  
      <v-spacer></v-spacer>
  
      
      <v-btn @click="toggleRightDrawer">
        <v-icon>mdi-menu</v-icon> Right
      </v-btn>
    </v-app-bar>
  
    <v-main>
      <!-- Left Drawer -->
      <v-navigation-drawer v-model="leftdrawer" app :clipped="true" width="200">
        <v-list>
          <v-row class="gap-2">
            <v-col>
              <v-btn><v-icon>mdi-cloud</v-icon> Function 1</v-btn>
            </v-col>
            <v-col>
              <v-btn><v-icon>mdi-cloud</v-icon> Function 2</v-btn>
            </v-col>
            <v-col>
              <v-btn><v-icon>mdi-cloud</v-icon> Function 3</v-btn>
            </v-col>
            <v-col>
              <v-btn><v-icon>mdi-cloud</v-icon> Function 4</v-btn>
            </v-col>
          </v-row>
        </v-list>
      </v-navigation-drawer>
  
      <!-- Map -->
      <div style="width: 100%; height: 100vh;">
        <BasinComponent />
      </div>
  
      <!-- Right Drawer -->
      <v-navigation-drawer v-model="rightdrawer" location="right" app width="200">
        <v-list>
          <v-row class="gap-2">
            <v-col>
              <v-btn><v-icon>mdi-phone</v-icon> Func 1</v-btn>
            </v-col>
            <v-col>
              <v-btn><v-icon>mdi-phone</v-icon> Func 2</v-btn>
            </v-col>
            <v-col>
              <v-btn><v-icon>mdi-phone</v-icon> Func 3</v-btn>
            </v-col>
            <v-col>
              <v-btn><v-icon>mdi-phone</v-icon> Func 4</v-btn>
            </v-col>
          </v-row>
        </v-list>
      </v-navigation-drawer>
    </v-main>
</div>
  </template>
  
  <script>
  import BasinComponent from '../GangaBasin/BasinComponent.vue';
  
  export default {
    name: 'BasinPage',
    components: {
      BasinComponent,
    },
    data() {
      return {
        leftdrawer: false,  
        rightdrawer: false, 
      };
    },
    methods: {
      toggleLeftDrawer() {
        this.leftdrawer = !this.leftdrawer; 
      },
      toggleRightDrawer() {
        this.rightdrawer = !this.rightdrawer; 
      },
    },
  };
  </script>
  
  <style scoped>
.Basin{
    overflow: hidden;
}
  
  </style>
  