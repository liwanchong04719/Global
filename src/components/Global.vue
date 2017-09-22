<template>
  <div id="cesiumContainer"></div>
</template>

<script>
window.CESIUM_BASE_URL = './Cesium';
const Cesium = require('../../node_modules/cesium/Source/Cesium.js');
require('../../node_modules/cesium/Source/Widgets/widgets.css');

export default {
  name: 'global',
  data() {
    return {};
  },
  mounted() {
    const viewer = new Cesium.Viewer('cesiumContainer', {
      sceneMode: Cesium.SceneMode.SCENE3D,
      homeButton: false,
      animation: false,
      timeline: false,
      infoBox: false,
      navigationHelpButton: false,
      baseLayerPicker: false,
      geocoder: false,
      imageryProvider: new Cesium.MapboxImageryProvider({
        mapId: 'mapbox.satellite',
        accessToken:
                'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NDg1bDA1cjYzM280NHJ5NzlvNDMifQ.d6e-nNyBDtmQCVwVNivz7A',
      }),

//      skyBox: new Cesium.SkyBox({
//        sources: {
//          positiveX: 'stars/TychoSkymapII.t3_08192x04096_80_px.jpg',
//          negativeX: 'stars/TychoSkymapII.t3_08192x04096_80_mx.jpg',
//          positiveY: 'stars/TychoSkymapII.t3_08192x04096_80_py.jpg',
//          negativeY: 'stars/TychoSkymapII.t3_08192x04096_80_my.jpg',
//          positiveZ: 'stars/TychoSkymapII.t3_08192x04096_80_pz.jpg',
//          negativeZ: 'stars/TychoSkymapII.t3_08192x04096_80_mz.jpg',
//        },
//      }),
    });

    viewer.extend(Cesium.viewerDragDropMixin);

    const initialPosition = Cesium.Cartesian3.fromDegrees(115.0, 40.69114333714821,
            15550000);
    viewer.scene.camera.setView({
      destination: initialPosition,
      endTransform: Cesium.Matrix4.IDENTITY,
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#cesiumContainer {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
#cesiumContainer .cesium-viewer-bottom {
  display: none;
}
</style>