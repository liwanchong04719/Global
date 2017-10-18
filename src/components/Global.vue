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
    props: ['crowdInfoSource', 'commonInfoSource', 'randomData', 'poiChangedNum'],
    data: function () {
      return {
        randomEntities: [],
        commonEntities: [],
        crowdEntities: []
      };
    },
    computed: {
      allEntities: function () {
        let arr = [];
        Array.prototype.push.apply(arr, this.commonEntities);
        Array.prototype.push.apply(arr, this.crowdEntities);
        return arr;
      }
    },
    watch: {
      crowdInfoSource: function () {
        if (this.$props.crowdInfoSource) {
          this.loadCrowdData();
        } else {
          for (let i=0;i<this.crowdEntities.length;i++) {
            this.viewer.entities.remove(this.crowdEntities[i]);
          }
          this.crowdEntities.length = 0;
        }
      },
      commonInfoSource: function () {
        if (this.$props.commonInfoSource) {
          this.loadCommonData();
        } else {
          for (let i=0;i<this.commonEntities.length;i++) {
            this.viewer.entities.remove(this.commonEntities[i]);
          }
          this.commonEntities.length = 0;
        }
      },
      randomData: function () {
        // 增加随机点
        // let points = this.generateRandomPoint(this.$props.poiChangedNum);
        // if (this.randomEntities.length > 0) {
        //   for (let i=0;i<this.randomEntities.length;i++) {
        //     this.viewer.entities.remove(this.randomEntities[i]);
        //   }
        //   this.randomEntities.length = 0;       
        // }
        
        // for (let i=0;i<points.length;i++) {
        //   this.randomEntities.push(this.viewer.entities.add(points[i]));
        // }
        let c = this.$props.poiChangedNum;
        let i;
        let t = this.allEntities.length - 1;
        while (t >= 0 && c > 0) {
          i = parseInt(t * Math.random());
          let originRadius = this.allEntities[i].point.pixelSize.getValue();
          // 这里不知道为什么有的时候会返回闪烁中的半径值，先简单处理一下
          if (originRadius > 10) {
            originRadius = originRadius / 3;
          }
          let newRadius = originRadius;
          let cnt = 0;
          this.allEntities[i].point.pixelSize = new Cesium.CallbackProperty(function(){
            // 闪烁次数
            if (cnt < 5) {              
              if (newRadius === originRadius){
                newRadius = originRadius * 3;                                                     
              } else {
                newRadius = originRadius;
                cnt++;                                      
              }    
            }     
            return newRadius;
          }, false);
          c--;
        }
      }
    },
    methods: {
      reloadData () {
        this.viewer.entities.removeAll();
        this.allEntities.length = 0;
        if (this.$props.commonInfoSource){
          this.loadCommonData();
        }
        if (this.$props.crowdInfoSource){
          this.loadCrowdData();
        }
      },
      generateRandomPoint (num) {
        const minLat = 25;
        const maxLat = 45;
        const minLon = 110;
        const maxLon = 120;
        let points = [];
        for (let i = 0; i< num; i++){
          let radius = 7;
          let cnt = 0;
          const tmpEntity = {
            position: Cesium.Cartesian3.fromDegrees(minLon + (maxLon - minLon) * Math.random(), minLat + (maxLat - minLat) * Math.random()),
            point: {
              pixelSize: new Cesium.CallbackProperty(function(){
                let r = radius;
                if (cnt < 5) {              
                  if (radius === 7){
                    radius = 14;                                                     
                  } else {
                    radius = 7;
                    cnt++;                                      
                  }    
                }     
                return r;
              }, false),
              color: Cesium.Color.CYAN,
            }
          };
          points.push(tmpEntity);
        }
        return points;
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
      loadCrowdData () {
        const that = this;
        axios({
          method: 'get',
          url: 'http://fastmap.navinfo.com/service/statics/crowdInfo',
        }).then(function (res) {
          if (res.data.errcode === 0) {
            let tempSourceData = that.data2GeoJson(res.data.data);
            let i, feature;
            for (i=0; i<tempSourceData.features.length; i++){
              feature = tempSourceData.features[i];
              that.crowdEntities.push(that.viewer.entities.add({
                position: Cesium.Cartesian3.fromDegrees(feature.geometry.coordinates[0],
                        feature.geometry.coordinates[1]),
                point: {
                  pixelSize: 5,
                  color: Cesium.Color.fromCssColorString('#FFCC00')
                }
              }));
            }
          }
        }).catch(function(err){
        })
      },
      loadCommonData () {
        const that = this;
        axios({
          method: 'get',
          url: 'http://fastmap.navinfo.com/service/statics/commonInfo',
          dataType: 'json'
        }).then(function (res) {
          if (res.data.errcode === 0) {
            let tempSourceData = that.data2GeoJson(res.data.data);
            let i, feature;
            for (i=0; i<tempSourceData.features.length; i++){
              feature = tempSourceData.features[i];
              that.commonEntities.push(that.viewer.entities.add({
                position: Cesium.Cartesian3.fromDegrees(feature.geometry.coordinates[0],
                        feature.geometry.coordinates[1]),
                point: {
                  pixelSize: 7,
                  color: Cesium.Color.fromCssColorString('#CC3333')
                }
              }));
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
          mapId: 'mapbox.streets-satellite',
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
              15000000);
      viewer.scene.camera.setView({
        destination: initialPosition,
        endTransform: Cesium.Matrix4.IDENTITY,
      });

      // 禁用默认的鼠标拖动来滚动地图
      // viewer.scene.screenSpaceCameraController.enableRotate = false;

      this.viewer = viewer;
      this.reloadData();
    },

    beforeUpdate() {
      // this.refreshDataSources();
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
