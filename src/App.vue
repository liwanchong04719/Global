<template>
  <div class="flex-layout-v fm-stretch" style='background-color:black;'>
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
              <line-chart :chartData='charData.thrid'></line-chart>
            </div>
          </div>
          <div class="row">
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
              <span class="num-yellow">{{title.roadLen | splitSymbol}}</span> 公里 POI总数量：
              <span class="num-yellow">{{title.poiNum | splitSymbol}}</span> 个
            </div>
            <div class="title h3">
              今天 道路更新：
              <span class="num-white">{{title.perUpdateRoad | splitSymbol}}</span> 公里 新增道路：
              <span class="num-white">{{title.perAddRoad | splitSymbol}}</span> 公里
            </div>
            <div class="title h3">
              POI更新：
              <span class="num-white">{{title.perUpdatePoi | splitSymbol}}</span> 个 新增：
              <span class="num-white">{{title.perAddPoi | splitSymbol}}</span> 个
            </div>
          </div>
          <div class="legendContainer">
            <div class="legend">
              <div><span class="commonInfo"></span> 自采分布</div>
              <div><span class="crowdInfo"></span> 众包分布</div>
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
              <day-chart :dayProduce="charData.dayProduce"></day-chart>
            </div>
          </div>
          <div class="row">
            <div class="panel" style="height: 100px;width: 400px;">
              <month-chart :monthProduce="charData.monthProduce"></month-chart>
            </div>
          </div>
          <div class="row">
            <div class="panel" style="height: 100px;width: 400px;">
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
      title:{
      },
      charData: {
        poi: {
            newData:[],
            updateData:[],
            xAxis:[],
            cUpdatePoi:0,
            cAddPoi:0
        },
        road: {
            newData:[],
            updateData:[],
            xAxis:[],
            cUpdateRoad:0,
            cAddRoad:0
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
        },
        thrid: {
            lineData:[[],[],[]], //  用户轨迹点,用户问题反馈,互联网信息
            xAxis:[]
        }
      }
    }
  },
  filters: {
    splitSymbol: function (value){ // 将数字三位隔开
      return parseInt(value).toLocaleString();
    }
  },
  methods: {
    getChartData: function () {
      let that = this;
      that.$http.get('http://fs-road.navinfo.com/dev/trunk/service/statics/productMonitor').then((data) => {
        if (data && data.body.errcode == 0) {
          that.recomData(data.body.data);
        }
      })
    },
    recomData: function (data) {
      this.titleData(data);
      this.recomPoi(data)
      this.recomRoad(data)
      this.recomDayProduce(data);
      this.recomMonthProduce(data);
      this.recomThird(data);
    },
    titleData: function (data) {
      this.title.roadLen = data.roadLen;
      this.title.poiNum = data.poiNum;
      this.title.perUpdateRoad = data.perUpdateRoad;
      this.title.perAddRoad = data.perAddRoad;
      this.title.perUpdatePoi = data.perUpdatePoi;
      this.title.perAddPoi = data.perAddPoi;
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
      let inforDetail = data.thirdInforDetail;// 用户轨迹点 -- 数据情报收集详情
      let userDetail = data.thirdUserDetail;// 用户问题反馈  -- 用户反馈详情
      let webDetail = data.thirdWebDetail;// 互联网信息  -- 互联网信息详情
      let inforTotal = data.thirdInforTotal;// 用户轨迹点 -- 数据情报收集
      let userTotal = data.thirdUserTotal;// 用户问题反馈  -- 用户反馈
      let webTotal = data.thirdWebTotal;// 互联网信息  -- 互联网信息

      this.charData.thrid.inforTotal =  inforTotal;
      this.charData.thrid.userTotal =  userTotal;
      this.charData.thrid.webTotal =  webTotal;
      for(let i in inforDetail){
        if (inforDetail.hasOwnProperty(i)) {
          this.charData.thrid.xAxis.push(i + '月');
          this.charData.thrid.lineData[0].push(inforDetail[i]);
          this.charData.thrid.lineData[1].push(userDetail[i]);
          this.charData.thrid.lineData[2].push(webDetail[i]);
        };
      }
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
      // console.info(JSON.stringify(this.charData.monthProduce));
    },
    getTestData: function () {
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

      data.thirdInforDetail = {'1':120,'2':132,'3':101,'4':101,'5':134,'6':90,'7':230,'8':'210','9':120,'10':132,'11':134,'12':90}; // 用户轨迹点 -- 数据情报收集
      data.thirdUserDetail = {'1':220,'2':182,'3':191,'4':234,'5':290,'6':330,'7':310,'8':'220','9':182,'10':191,'11':234,'12':290}; // 用户问题反馈  -- 用户反馈
      data.thirdWebDetail = {'1':150,'2':232,'3':201,'4':154,'5':190,'6':330,'7':410,'8':'150','9':232,'10':201,'11':154,'12':190};// 互联网信息  -- 互联网信息
      data.thirdInforTotal = 250;
      data.thirdUserTotal = 220;
      data.thirdWebTotal = 260;
      return data;
    }
  },
  created () {
    this.getChartData();
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

div.legendContainer {
  position: absolute;
  bottom: 10px;
  left: 0px;
  width: 100%;
  text-align: center;
}

div.legendContainer div.legend {
  display: inline-block;
}

div.legendContainer div.legend>div{
  color: #fff;
  font-weight: 500;
  display: inline-block;
  line-height: 18px;
}

div.legendContainer div.legend span{
  display: inline-block;
  width: 16px;
  height: 16px;
  vertical-align: bottom;
}

div.legendContainer div.legend span.commonInfo{
  background-color: #ff0000;
}

div.legendContainer div.legend span.crowdInfo{
  background-color: #ffff00;
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
</style>
