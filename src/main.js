import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';

// Import Cesium
import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css'; // Import Cesium's default styles

// Load fonts
loadFonts();

// Set Cesium globally for OL-Cesium
window.Cesium = Cesium;

// Define the Cesium base URL (for static assets)
window.CESIUM_BASE_URL = '/node_modules/cesium/Build/Cesium/';

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app');
