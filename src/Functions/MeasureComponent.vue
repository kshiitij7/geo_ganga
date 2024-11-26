<template>
    <div>
      <div v-show="isMeasuring" class="measurement-info">
        <p>{{ measurementMessage }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { Draw } from 'ol/interaction';
  import { Overlay } from 'ol';
  import VectorSource from 'ol/source/Vector';
  import { getLength, getArea } from 'ol/sphere';
  import { unByKey } from 'ol/Observable';
  import eventBus from '@/event-bus';
  
  export default {
    name: 'MeasureComponent',
    data() {
      return {
        draw: null,
        isMeasuring: false,
        measureTooltip: null,
        measureTooltipElement: null,
        measurementMessage: 'Click to start measuring',
        map: null,
        drawType: 'LineString', // Default to LineString
      };
    },
    mounted() {
      // Listen for measurement tool activation with draw type
      eventBus.on('toggle-measurement', ({ isMeasuring, type }) => {
        this.isMeasuring = isMeasuring;
        this.drawType = type || 'LineString';
        this.toggleMeasurementTool();
      });
  
      // Receive map instance
      eventBus.on('map-instance', (mapInstance) => {
        this.map = mapInstance;
      });
    },
    methods: {
      toggleMeasurementTool() {
        if (this.isMeasuring) {
          this.activateMeasurement();
        } else {
          this.deactivateMeasurement();
        }
      },
      activateMeasurement() {
        // Initialize draw interaction based on selected type
        this.draw = new Draw({
          source: new VectorSource(),
          type: this.drawType,
        });
  
        this.map.addInteraction(this.draw);
  
        this.createMeasureTooltip();
  
        this.draw.on('drawstart', this.startDrawing);
        this.draw.on('drawend', this.endDrawing);
      },
      deactivateMeasurement() {
        // Clean up draw interaction and tooltip
        if (this.draw) {
          this.map.removeInteraction(this.draw);
          this.draw = null;
        }
        if (this.measureTooltipElement) {
          this.measureTooltipElement.remove();
          this.measureTooltipElement = null;
        }
      },
      createMeasureTooltip() {
        if (this.measureTooltipElement) {
          this.measureTooltipElement.remove();
        }
        this.measureTooltipElement = document.createElement('div');
        this.measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
        this.measureTooltip = new Overlay({
          element: this.measureTooltipElement,
          offset: [0, -15],
          positioning: 'bottom-center',
        });
        this.map.addOverlay(this.measureTooltip);
      },
      startDrawing(evt) {
        const sketch = evt.feature;
  
        // Attach geometry change listener for measurement updates
        const listener = sketch.getGeometry().on('change', (e) => {
          const geom = e.target;
          let output;
          if (geom.getType() === 'LineString') {
            output = `${Math.round(getLength(geom) * 100) / 100} meters`;
          } else if (geom.getType() === 'Polygon') {
            output = `${Math.round(getArea(geom) * 100) / 100} m²`;
          }
          this.measureTooltipElement.innerHTML = output;
          this.measureTooltip.setPosition(geom.getLastCoordinate());
        });
  
        // Clean up listener on draw end
        this.draw.on('drawend', () => unByKey(listener));
      },
      endDrawing() {
        // Finalize tooltip appearance
        this.measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
        this.measureTooltipElement = null;
        this.createMeasureTooltip();
      },
    },
  };
  </script>
  
  <style scoped>
  .measurement-info {
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: white;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .ol-tooltip {
    position: absolute;
    background-color: white;
    border: 1px solid #ccc;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
  }
  .ol-tooltip-measure {
    font-weight: bold;
  }
  .ol-tooltip-static {
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid #ccc;
    color: black;
    padding: 4px;
    border-radius: 4px;
    white-space: nowrap;
  }
  </style>
  