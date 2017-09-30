<template>
  <div id="cesiumContainer"></div>
</template>

<script>
import axios from 'axios';
window.CESIUM_BASE_URL = './static/Cesium';
const Cesium = require('../../node_modules/cesium/Source/Cesium.js');
require('../../node_modules/cesium/Source/Widgets/widgets.css');

export default {
  name: 'global',
  props: ['crowdInfoSource', 'commonInfoSource'],
  watch: {
    crowdInfoSource: function () {
      this.refreshDataSources();
      console.log('crowdInfoSource');
    },
    commonInfoSource: function () {
      this.refreshDataSources();
      console.log('commonInfoSource');
    }
  },
  methods: {
    refreshDataSources () {
      this.viewer.entities.removeAll();
      if (this.$props.commonInfoSource){
        this.refreshCommonData();
      }
      if (this.$props.crowdInfoSource){
        this.refreshCrowdData();
      }
    },

    data2GeoJson (data) {
      let featureCollection={
        type: "FeatureCollection",
        features: [],
      };
      for (let i=0; i<data.length; i++){
        featureCollection.features.push({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [data[i].x, data[i].y]
          },
          properties: {}
        })
      }
      return featureCollection;
    },
    refreshCrowdData () {
      const that = this;
      axios({
        method: 'get',
        url: 'http://fastmap.navinfo.com/service/statics/crowdInfo',
      }).then(function (res) {
        let tempSourceData = null;
        if (res.data.errcode === 0) {
          tempSourceData = that.data2GeoJson(res.data.data);
          for (let i=0; i<tempSourceData.features.length; i++){
            const feature = tempSourceData.features[i];
            that.viewer.entities.add({
              position: Cesium.Cartesian3.fromDegrees(feature.geometry.coordinates[0],
                      feature.geometry.coordinates[1]),
              point: {
                pixelSize: 5,
                color: Cesium.Color.YELLOW
              }
            })
          }
        }
      }).catch(function(err){
      })
    },

    refreshCommonData () {
      const that = this;
      axios({
        method: 'get',
        url: 'http://fastmap.navinfo.com/service/statics/commonInfo',
        dataType: 'json'
      }).then(function (res) {
        let tempSourceData = null;
        if (res.data.errcode === 0) {
          tempSourceData = that.data2GeoJson(res.data.data);
          for (let i=0; i<tempSourceData.features.length; i++){
            const feature = tempSourceData.features[i];
            that.viewer.entities.add({
              position: Cesium.Cartesian3.fromDegrees(feature.geometry.coordinates[0],
                      feature.geometry.coordinates[1]),
              point: {
                pixelSize: 5,
                color: Cesium.Color.RED
              }
            })
          }
        }
      }).catch(function(err){
      })
    },
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
      fullscreenButton: false,
      sceneModePicker: false,
      selectionIndicator: false, // 禁用默认的entity选择
      imageryProvider: new Cesium.MapboxImageryProvider({
        mapId: 'mapbox.satellite',
        accessToken:
                'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NDg1bDA1cjYzM280NHJ5NzlvNDMifQ.d6e-nNyBDtmQCVwVNivz7A',
      }),
      skyBox: new Cesium.SkyBox({
        sources: {
          positiveX:
                  'static/Cesium/Assets/stars/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_px.jpg',
          negativeX:
                  'static/Cesium/Assets/stars/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_mx.jpg',
          positiveY:
                  'static/Cesium/Assets/stars/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_py.jpg',
          negativeY:
                  'static/Cesium/Assets/stars/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_my.jpg',
          positiveZ:
                  'static/Cesium/Assets/stars/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_pz.jpg',
          negativeZ:
                  'static/Cesium/Assets/stars/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_mz.jpg',
        },
      }),
    });

    viewer.extend(Cesium.viewerDragDropMixin);

    // 禁用默认的双击一个entity后，自动缩放、定位操作
    viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

    const initialPosition = Cesium.Cartesian3.fromDegrees(115.0, 40.69114333714821,
            15550000);
    viewer.scene.camera.setView({
      destination: initialPosition,
      endTransform: Cesium.Matrix4.IDENTITY,
    });

    // 禁用默认的鼠标拖动来滚动地图
    // viewer.scene.screenSpaceCameraController.enableRotate = false;

    this.viewer = viewer;

    this.refreshDataSources();
  },

  beforeUpdate() {
    this.refreshDataSources();
  }
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