<template>
  <div class="flex-layout-v fm-stretch">
    <router-view></router-view>
    <div class="flex-layout-v fm-stretch float">
      <div class="row fm-stretch flex-layout">
        <div class="col flex-layout-v">
          <div class="row">
            <div class="logo">
              <img src="./assets/navinfo.svg" style="width:240px;height: 80px;">
              <div style="padding: 0px 14px;color: #fff">( SZSE Code: 002405 )</div>
            </div>
            <div class="row text-yellow">
              数据来源
            </div>
          </div>
          <div class="row">
            <div class="panel" style="width: 400px;">
              <div class="row text-yellow-subTitle">自采</div>
              <bar-road-chart :roadData='charData.road'></bar-road-chart>
            </div>
          </div>
          <div class="row">
            <div class="panel" style="width: 400px;">
              <bar-poi-chart :poiData='charData.poi'></bar-poi-chart>
            </div>
          </div>
          <div class="row">
            <div class="panel" style="width: 400px;">
              <div class="row text-yellow-subTitle">第三方数据</div>
              <line-chart></line-chart>
            </div>
          </div>
          <div class="row">
            <div class="row text-yellow-subTitle">众包</div>
            <div class="panel" style="height: 100px;width: 200px;"></div>
          </div>
        </div>
        <div class="col flex-layout-v">
          <div slot="title" class="flex-layout-v header" style="align-self: flex-start;">
            <div class="title h1">
              <span style="letter-spacing: 30px;">地图母库概览</span> Core Map Review
            </div>
            <div class="title h2">
              道路总里程：
              <span class="num-yellow">6,548,99</span> 公里 POI总数量：
              <span class="num-yellow">23,108,647</span> 个
            </div>
            <div class="title h3">
              今天 道路更新：
              <span class="num-white">6,548,99</span> 公里 新增道路：
              <span class="num-white">108,647</span> 公里
            </div>
            <div class="title h3">
              POI更新：
              <span class="num-white">23,108,647</span> 个 新增：
              <span class="num-white">108,647</span> 个
            </div>
          </div>
        </div>
        <div class="col flex-layout-v">
          <div class="row">
            <Banner></Banner>
            <div class="row text-yellow">
              数据出品
            </div>
          </div>
          <div class="row">
            <div class="panel" style="width: 400px;">
              <div class="row text-yellow-subTitle">日出品</div>
              <day-chart :dayProduce="charData.dayProduce"></day-chart>
            </div>
          </div>
          <div class="row">
            <div class="panel" style="height: 100px;width: 400px;">
              <div class="row text-yellow-subTitle">月出品</div>
              <month-chart :monthProduce="charData.monthProduce"></month-chart>
            </div>
          </div>
          <div class="row">
            <div class="panel" style="height: 100px;width: 400px;">
              <div class="row text-yellow-subTitle">季出品</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BarPoiChart from '@/components/chart/BarPoiChart'
import BarRoadChart from '@/components/chart/BarRoadChart'
import LineChart from '@/components/chart/LineChart'
import DayChart from '@/components/chart/DayChart'
import MonthChart from '@/components/chart/MonthChart'
import Banner from './components/Banner';

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      charData: {
        poi: {
            newData:[],
            updateData:[],
            xAxis:[]
        },
        road: {
            newData:[],
            updateData:[],
            xAxis:[]
        },
        dayProduce: {
            barData:[],
            lineData:[],
            yAxis:[]
        },
        monthProduce: {
            barData:[],
            lineData:[],
            yAxis:[]
        }
      }
    }
  },
  methods: {
    recomData: function (data) {
      this.recomPoi(data)
      this.recomRoad(data)
      this.recomDayProduce(data);
      this.recomMonthProduce(data);
    },
    recomPoi: function (data) { // 重组poi数据,使之符合图表格式
      let poiAvg = data.cPoiAverage;
      this.charData.poi.cUpdatePoi = data.cUpdatePoi;
      this.charData.poi.cAddPoi = data.cAddPoi;
      this.charData.poi.newData = [];
      this.charData.poi.updateData = [];
      this.charData.poi.xAxis = [];
      for(let i in poiAvg){
        if (poiAvg.hasOwnProperty(i)) {
          this.charData.poi.xAxis.push(i + '月');
          this.charData.poi.newData.push(poiAvg[i].add);
          this.charData.poi.updateData.push(poiAvg[i].update);
        };
      }
      console.info(this.charData.poi);
    },
    recomRoad: function (data) { // 重组road数据,使之符合图表格式
      let roadAvg = data.cRoadAverage;
      this.charData.road.cUpdateRoad = data.cUpdateRoad;
      this.charData.road.cAddRoad = data.cAddRoad;
      this.charData.road.newData = [];
      this.charData.road.updateData = [];
      this.charData.road.xAxis = [];
      for(let i in roadAvg){
        if (roadAvg.hasOwnProperty(i)) {
          this.charData.road.xAxis.push(i + '月');
          this.charData.road.newData.push(roadAvg[i].add);
          this.charData.road.updateData.push(roadAvg[i].update);
        };
      }
    },
    recomThird: function (data) { // 重组road数据,使之符合图表格式

    },
    recomDayProduce: function (data) { // 重组road数据,使之符合图表格式
      this.charData.dayProduce.barData = [data.dpAddPoi,data.dpUpdatePoi,data.dpAddRoad,data.dpUpdateRoad];
      this.charData.dayProduce.lineData = [data.dpAverage.addPoi,data.dpAverage.updatePoi,data.dpAverage.addRoad,data.dpAverage.updateRoad];
      this.charData.dayProduce.yAxis = [`新增POI ${data.dpAddPoi}个`,`更新PIO ${data.dpUpdatePoi}个`,`新增道路 ${data.dpAddRoad}公里`,`更新道路 ${data.dpUpdateRoad}公里`];
    },
    recomMonthProduce: function (data) { // 重组road数据,使之符合图表格式
      this.charData.monthProduce.barData = [data.mpAddPoi, data.mpUpdatePoi, data.mpAddRoad, data.mpUpdateRoad];
      this.charData.monthProduce.lineData = [data.mpAverage.addPoi, data.mpAverage.updatePoi, data.mpAverage.addRoad, data.mpAverage.updateRoad];
      this.charData.monthProduce.yAxis = [`新增POI ${data.mpAddPoi}个`,`更新PIO ${data.mpUpdatePoi}个`,`新增道路 ${data.mpAddRoad}公里`,`更新道路 ${data.mpUpdateRoad}公里`];
    }
  },
  created () {
    // 赋值测试假数据数据(和接口返回的格式保持一致)
    let data = {
    }
    data.cPoiAverage = {"1":{"update":16,"add":4},"2":{"update":12,"add":4},"3":{"update":12,"add":4},"4":{"update":12,"add":4},"5":{"update":12,"add":4},"6":{"update":62,"add":4},"7":{"update":12,"add":4},"8":{"update":12,"add":4},"9":{"update":30,"add":10},"10":{"update":40,"add":10},"11":{"update":0,"add":0},"12":{"update":0,"add":0}};
    data.cUpdatePoi = 123;
    data.cAddPoi = 23;

    data.cRoadAverage = {"1":{"update":48,"add":4},"2":{"update":12,"add":4},"3":{"update":62,"add":54},"4":{"update":12,"add":4},"5":{"update":18,"add":14},"6":{"update":12,"add":4},"7":{"update":12,"add":4},"8":{"update":12,"add":4},"9":{"update":20,"add":0},"10":{"update":50,"add":10},"11":{"update":0,"add":0},"12":{"update":0,"add":0}};
    data.cUpdateRoad = 233;
    data.cAddRoad = 44;

    data.dpAddPoi = 80;
    data.dpUpdatePoi = 180;
    data.dpAddRoad = 90;
    data.dpUpdateRoad = 80;
    data.dpAverage = {"updateRoad":80,"addRoad":60,"updatePoi":80,"addPoi":48}

    data.mpAddPoi = 90;
    data.mpUpdatePoi = 120;
    data.mpAddRoad = 40;
    data.mpUpdateRoad = 200;
    data.mpAverage = {"updateRoad":180,"addRoad":160,"updatePoi":80,"addPoi":58}

    this.recomData(data);
  },
  components: {
    BarPoiChart,
    BarRoadChart,
    LineChart,
    DayChart,
    MonthChart,
    Banner
  }
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  padding: 0px;
  margin: 0px;
}

div.fm-stretch {
  width: 100%;
  height: 100%;
}

div.flex-layout {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%
}

div.flex-layout-v {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
}

div.float {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

div.flex-layout>div.col {
  height: 100%;
}

div.flex-layout-v>div.row {
  width: 100%;
}

div.panel {
  pointer-events: auto;
}

div.header>div.title {
  padding: 10px 10px 0px 10px;
  color: #fff;
}
div.header>div.title:last-child {
  padding-bottom: 10px;
}

div.header>div.title.h1 {
  font-size: 40px;
  font-weight: bold;
}

div.header>div.title.h2 {
  font-size: 32px;
}

div.header>div.title.h3 {
  font-size: 32px;
}

.num-yellow {
  font-weight: bold;
  font-size: 30px;
  color: yellow;
}

.num-white {
  font-weight: bold;
  font-size: 32px;
  color: #fff;
}

.text-yellow {
  text-align: center;
  font-weight: bold;
  font-size: 32px;
  color: yellow;
  padding: 10px 0;
}

.text-yellow-subTitle {
  text-align: left;
  font-weight: bold;
  font-size: 26px;
  color: yellow;
  padding: 10px 0;
}

.chartTitle {
  margin-left:6px;
  margin-bottom:4px;
  color:yellow
}
</style>
