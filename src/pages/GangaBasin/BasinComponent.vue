<template>
  <div ref="map" class="map"></div>
</template>

<script>
import 'ol/ol.css'; 
import { Map } from 'ol';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM'; 
import { fromLonLat } from 'ol/proj';

export default {
  name: 'BasinComponent',
  mounted() {
    new Map({
      target: this.$refs.map, 
      layers: [
        new TileLayer({
          source: new OSM(), 
        }),
      ],
      view: new View({
        center: fromLonLat([78.9629, 20.5937]), 
        zoom: 6, 
      }),
    });
  },
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 100%;
}
</style>
