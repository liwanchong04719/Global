<template>
    <div id="cesiumContainer"></div>
</template>

<script>
window.CESIUM_BASE_URL = './Cesium';
const Cesium = require('../../node_modules/cesium/Source/Cesium.js');
require('../../node_modules/cesium/Source/Widgets/widgets.css');
// import Cesium from 'cesium';

// const Cesium = window.Cesium;
export default {
  name: 'global',
  data() {
    return {};
  },
  mounted() {
    const viewer = new Cesium.Viewer('cesiumContainer');
    // , {
    //   sceneMode: Cesium.SceneMode.SCENE2D,
    //   timeline: false,
    //   animation: false,
    // }
    // );

    const dataSource = Cesium.GeoJsonDataSource.load('https://cesiumjs.org/Cesium/Apps/SampleData/simplestyles.geojson');
    viewer.dataSources.add(dataSource);
    viewer.zoomTo(dataSource);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#cesiumContainer {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>