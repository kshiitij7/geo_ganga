<template>
<div ref="map" class="map"></div>
</template>

<script>
import 'ol/ol.css'; 
import { Map } from 'ol';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM'; 
import LayerSwitcher from 'ol-layerswitcher'; 
import 'ol-layerswitcher/dist/ol-layerswitcher.css'; 
import BingMaps from 'ol/source/BingMaps';
import TileWMS from 'ol/source/TileWMS';
import { get as getProjection } from 'ol/proj'; 

export default {
    name: 'BasinComponent',
    mounted() {
        const baseLayer = new TileLayer({
            title: 'OpenStreet Map',
            type: 'overlay',
            source: new OSM(),
        });

        const bingLayer = new TileLayer({
            title: 'Bing ',
            type: 'overlay',
            source: new BingMaps({
                key: "ArIdKOW0eb8TRcLZdt0l2cG8kHA_uW92yIvx1aFzsQ1xHxpnVRMGmO0N0neY8P90",
                imagerySet: 'AerialWithLabels',
            }),
        });

        const bhuvanLayer = new TileLayer({
            title: 'Bhuvan',
            type: 'overlay',
            source: new TileWMS({
                params: {
                    FORMAT: "image/jpeg",
                    VERSION: "1.1.1",
                    tiled: true,
                    LAYERS: "bhuvan_imagery",
                    exceptions: "application/vnd.ogc.se_inimage",
                },
                url: "https://bhuvan-ras2.nrsc.gov.in/tilecache/tilecache.py",

            }),

        });

        const basinBoundary = new TileLayer({
      title: 'Ganga Basin', 
      type: 'overlay',
      source: new TileWMS({
        url: 'http://192.168.17.37:8080/geoserver/Geo-Ganga/wms?',  
        params: {
          'LAYERS': 'Ganga_Basin_v4', 
          'TILED': true,              
          'VERSION': '1.1.1',         
        },
        serverType: 'geoserver',      
        tileGrid: new TileWMS().getTileGridForProjection(getProjection('EPSG:4326')),
      }),
    });

        const map = new Map({
            target: this.$refs.map,
            layers: [bhuvanLayer, baseLayer, bingLayer, basinBoundary, ],
            view: new View({
                projection: 'EPSG:4326',
                center: [78.9629, 20.5937],
                zoom: 5.7,
            }),
        });

        const layerSwitcher = new LayerSwitcher({
            activationMode: 'click',
            startActive: false,
            tipLabel: 'Layers',
            collapseLabel: '\u00BB',
            expandLabel: '\u00AB',

        });
        map.addControl(layerSwitcher);
    },
};
</script>

<style scoped>
.map {
    width: 100%;
    height: 100%;
}
</style>
