<template>
<div ref="map" class="map" style=" width: 100%;height: 100%;"></div>
<div id="mouse-pos" style="position: absolute;bottom: 5.4%; left: 9%; background-color: rgba(0, 0, 0, 0.7);color: white; padding: 0.1em 0.1em; border-radius: 4px; font-family: 'Poppins', sans-serif ; font-size: calc(5px + 0.5vw); z-index: 1000; pointer-events: none; max-width: 30%; text-align: center;"></div>
<div id="scale-line" style="position: absolute; left: 3%;"></div>
</template>

<script>
import 'ol/ol.css';
import { Map } from 'ol';
import BingMaps from 'ol/source/BingMaps';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import LayerSwitcher from 'ol-layerswitcher';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';
import TileWMS from 'ol/source/TileWMS';
import { get as getProjection} from 'ol/proj';
import FullScreen from 'ol/control/FullScreen';
import { Draw,} from 'ol/interaction';
import { Vector as VectorSource} from 'ol/source';
import {Vector as VectorLayer} from 'ol/layer';
import { MousePosition} from 'ol/control';
import { ScaleLine} from 'ol/control.js';
import {createStringXY} from 'ol/coordinate';
import eventBus from '@/event-bus';
import { getLength, getArea} from 'ol/sphere';
import Overlay from 'ol/Overlay.js';

export default {
    name: 'BasinComponent',

    mounted() {
        const osmLayer = new TileLayer({
            title: 'Open Street Map',
            type: 'overlay',
            source: new OSM(),
            visible: false,
        });
        const bingLayer = new TileLayer({
            title: 'Bing',
            type: 'overlay',
            source: new BingMaps({ key: "ArIdKOW0eb8TRcLZdt0l2cG8kHA_uW92yIvx1aFzsQ1xHxpnVRMGmO0N0neY8P90", imagerySet: 'AerialWithLabels', }),
            visible: true,
        });
        const bhuvanLayer = new TileLayer({
            title: 'Bhuvan',
            type: 'overlay',
            source: new TileWMS({
                params: {FORMAT: "image/jpeg",VERSION: "1.1.1",tiled: true,LAYERS: "bhuvan_imagery",exceptions: "application/vnd.ogc.se_inimage", },
                url: "https://bhuvan-ras2.nrsc.gov.in/tilecache/tilecache.py",
            }),
            visible: false,
        });
        const indiaCountryBoundary = new TileLayer({
            title: 'India Boundary',
            type: 'overlay',
            source: new TileWMS({
                url: 'http://192.168.17.37:8080/geoserver/Geo-Ganga/wms?',
                params: {'LAYERS': 'india_country_boundary_4326','TILED': true,'VERSION': '1.1.1',},
                serverType: 'geoserver',
                tileGrid: new TileWMS().getTileGridForProjection(getProjection('EPSG:4326')),
            }),
            visible: true,
        });
        const basinBoundary = new TileLayer({
            title: 'Ganga Basin',
            type: 'overlay',
            source: new TileWMS({
                url: 'http://192.168.17.37:8080/geoserver/Geo-Ganga/wms?',
                params: {'LAYERS': 'Ganga_Basin_v4','TILED': true,'VERSION': '1.1.1',},
                serverType: 'geoserver',
                tileGrid: new TileWMS().getTileGridForProjection(getProjection('EPSG:4326')),
            }),
            visible: true,
        });
        const basinStatesBoundary = new TileLayer({
            title: 'State Boundary',
            type: 'overlay',
            source: new TileWMS({
                url: 'http://192.168.17.37:8080/geoserver/Geo-Ganga/wms?',
                params: {'LAYERS': 'states_boundary_ganga','TILED': true,'VERSION': '1.1.1', },
                serverType: 'geoserver',
                tileGrid: new TileWMS().getTileGridForProjection(getProjection('EPSG:4326')),
            }),
            visible: false,
        });
        const basinDistrictsBoundary = new TileLayer({
            title: 'District Boundary',
            type: 'overlay',
            source: new TileWMS({
                url: 'http://192.168.17.37:8080/geoserver/Geo-Ganga/wms?',
                params: {'LAYERS': 'district_touch','TILED': true,'VERSION': '1.1.1',},
                serverType: 'geoserver',
                tileGrid: new TileWMS().getTileGridForProjection(getProjection('EPSG:4326')),
            }),
            visible: false,
        });
        const basinSubDistrictsBoundary = new TileLayer({
            title: 'Sub-District Boundary',
            type: 'overlay',
            source: new TileWMS({
                url: 'http://192.168.17.37:8080/geoserver/Geo-Ganga/wms?',
                params: {'LAYERS': 'subdistrict_touch','TILED': true,'VERSION': '1.1.1',},
                serverType: 'geoserver',
                tileGrid: new TileWMS().getTileGridForProjection(getProjection('EPSG:4326')),
            }),
            visible: false,
        });

        const map = new Map({
            target: this.$refs.map,
            layers: [bhuvanLayer, osmLayer, bingLayer, basinSubDistrictsBoundary, basinDistrictsBoundary, basinStatesBoundary, indiaCountryBoundary, basinBoundary],
            view: new View({projection: 'EPSG:4326',center: [82.0662, 26.2648],zoom: 6.5,minZoom: 6.5,}),
        });
        const scaleControl = new ScaleLine({units: 'metric',bar: true,steps: 5,text: true,minWidth: 200, dpi:96, target: 'scale-line',});
        map.addControl(scaleControl);

        const mousePositionControl = new MousePosition({projection: 'EPSG:4326', coordinateFormat: createStringXY(4), target: document.getElementById('mouse-pos'), className: '',});
        map.addControl(mousePositionControl);
        
        const layerSwitcher = new LayerSwitcher({activationMode: 'click',startActive: false,tipLabel: 'Layers',collapseLabel: '\u00BB',expandLabel: '\u00AB',showRoot: false,});
        map.addControl(layerSwitcher);

        const fullScreenControl = new FullScreen({tipLabel: 'Fullscreen',});
        map.addControl(fullScreenControl);

        // Measurement Layer
        this.measurementSource = new VectorSource();
        this.measurementLayer = new VectorLayer({source: this.measurementSource,style: {'fill-color': 'rgba(255, 255, 255, 0.2)','stroke-color': 'rgba(255, 255, 255, 0.8)','stroke-lineDash': [10, 10],'stroke-width': 3,},});
        map.addLayer(this.measurementLayer);

        this.map = map;
        this.measurementOverlays = []; //calculation answers
        // Listen to events from BasinPage to activate and set measurement mode
        eventBus.on('set-measurement-mode', this.setMeasurementMode);
        eventBus.on('clear-measurements', this.deactivateMeasurement);
        eventBus.on('clear-measurements', this.clearMeasurements);      
    },

    methods: {
        setMeasurementMode(mode) {
            this.deactivateMeasurement();
            this.measurementMode = mode;
            this.activateMeasurement(mode);
        },
        activateMeasurement(mode) {
            const type = mode === 'Length' ? 'LineString' : 'Polygon';
            this.drawInteraction = new Draw({source: this.measurementSource,type: type,});
            const measurementOverlay = document.createElement('div');
            measurementOverlay.className = 'measurement-overlay';
            measurementOverlay.style.position = 'absolute';
            measurementOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            measurementOverlay.style.color = 'white';
            measurementOverlay.style.padding = '2px 4px';
            measurementOverlay.style.borderRadius = '4px';
            measurementOverlay.style.fontSize = '12px';
            measurementOverlay.style.pointerEvents = 'none';
            const overlay = new Overlay({element: measurementOverlay,positioning: 'center-center',stopEvent: false,});
        
            this.map.addOverlay(overlay);
            this.drawInteraction.on('drawstart', (event) => {
                const geometry = event.feature.getGeometry();
                geometry.on('change', () => {
                const coordinates = geometry.getLastCoordinate();
                overlay.setPosition(coordinates);
                const transformedGeometry = geometry.clone().transform('EPSG:4326', 'EPSG:3857');
                if (mode === 'Length') {
                    const length = getLength(transformedGeometry);
                    const displayLength = length > 100 ? `${(length / 1000).toFixed(2)} km` : `${length.toFixed(2)} m`;
                    measurementOverlay.innerHTML = `Length: ${displayLength}`;
                } else if (mode === 'Area') {                    
                    const area = getArea(transformedGeometry);  
                    const displayArea =area > 10000 ? `${(area / 1e6).toFixed(2)} km²` : `${area.toFixed(2)} m²`;
                    measurementOverlay.innerHTML = `Area: ${displayArea}`;
                    overlay.setPosition(geometry.getInteriorPoint().getCoordinates());
                }
                });
            });

            this.drawInteraction.on('drawend', (event) => {
            const feature = event.feature;
            const geometry = feature.getGeometry();
            const transformedGeometry = geometry.clone().transform('EPSG:4326', 'EPSG:3857');

            if (mode === 'Length') {
                const length = getLength(transformedGeometry);
                const displayLength = length > 100    ? `${(length / 1000).toFixed(2)} km` : `${length.toFixed(2)} m`;
                measurementOverlay.innerHTML = `Length: ${displayLength}`;
            }else if (mode === 'Area') { 
                const area = getArea(transformedGeometry); 
                const displayArea = area > 10000  ? `${(area / 1e6).toFixed(2)} km²`  : `${area.toFixed(2)} m²`;
                measurementOverlay.innerHTML = `Area: ${displayArea}`;
                overlay.setPosition(geometry.getInteriorPoint().getCoordinates());
        }
        });
        this.map.addInteraction(this.drawInteraction);
        this.measurementOverlays.push(overlay);
        },

        deactivateMeasurement() {
            if (this.drawInteraction) {
                this.map.removeInteraction(this.drawInteraction);
            }
            if (this.modifyInteraction) {
                this.map.removeInteraction(this.modifyInteraction);
            }
        },
        clearMeasurements() {
        this.measurementSource.clear();
        // Remove all overlays (measurements)
        this.measurementOverlays.forEach((overlay) => {
        this.map.removeOverlay(overlay);
        });
        this.measurementOverlays = []; // Reset the overlay array
        },
    },
};
</script>


