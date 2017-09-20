<template>
    <div id="global" class="global">
        <h1>{{ msg }}</h1>
    </div>
</template>

<script>
  require('../../node_modules/cesium/Source/Cesium.js');

  const Cesium = window.Cesium;
  export default {
    el: '#global',
    name: 'global',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
      };
    },
    mounted() {
      const viewer = new Cesium.Viewer('cesiumContainer', {
        sceneMode: Cesium.SceneMode.SCENE2D,
        timeline: false,
        animation: false,
      });

      const dataSource = Cesium.GeoJsonDataSource.load('https://cesiumjs.org/Cesium/Apps/SampleData/simplestyles.geojson');
      viewer.dataSources.add(dataSource);
      viewer.zoomTo(dataSource);
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>