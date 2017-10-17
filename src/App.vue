<template>
  <div class="flex-layout-v fm-stretch" style='background-color:black;'>
    <Global :randomData="dataSourceStatus.randomData" :poiChangedNum="dataSourceStatus.poiChangedNum" :crowdInfoSource='dataSourceStatus.crowdInfoSource' :commonInfoSource='dataSourceStatus.commonInfoSource'></Global>
    <div class="flex-layout-v fm-stretch float">
      <div class="row fm-stretch flex-layout">
        <div class="col flex-layout-v" style='width:550px;'>
          <div class="row">
            <div class="row top-title left">
              数据来源
            </div>
          </div>
          <div class="row">
            <panel title="自采">
              <div slot="content">
                <bar-road-chart :roadData='charData.road'></bar-road-chart>
                <bar-poi-chart :poiData='charData.poi'></bar-poi-chart>
              </div>
            </panel>
          </div>
          <div class="row">
            <panel title="第三方数据">
              <div slot="content">
                <line-chart :chartData='charData.thrid'></line-chart>
              </div>
            </panel>
          </div>
          <div class="row">
            <panel title="众包">
              <div slot="content">
                <div style='display:flex;color:#DDD;padding:6px'>
                <div style='flex:1 1 auto;text-align:center;'>用户总量</div>
                <div style='flex:4 1 auto;'>
                  <div><span class='numberText'>{{crowd.crowdUserNum}}</span> 个</div>
                </div>
              </div>
              <div style='display:flex;color:#DDD;padding:6px'>
                <div style='flex:1 1 auto;text-align:center;'>全年累积</div>
                <div style='flex:1 1 auto;'>
                  <div>采集道路</div>
                  <div>采集poi</div>
                </div>
                <div style='flex:1 1 auto;'>
                  <div><span class='numberText'>{{crowd.crowdRoadLen}}</span> 公里</div>
                  <div><span class='numberText'>{{crowd.crowdPoiNum}}</span> 个</div>
                </div>
              </div>
              </div>
            </panel>
          </div>
        </div>
        <div class="col flex-layout-v">
          <div class='center-content'>
            <div style='padding-top:12px;text-align:center;'>
              <div class='date-text' style='float: left;margin-left:80px'><Banner :flag=1></Banner></div>
              <img src="./assets/ziti.png" style='text-algin:center;'>
              <div class='date-text' style='float: right;margin-right:80px'><Banner :flag=2></Banner></div>
            </div>
            <div style='display:flex;color:white;padding:2px 0px 2px 190px;'>
              <div style='flex:1 1 auto;'>
                  <div class="num-white">道路总数：<span class="num-yellow">{{title.roadLen | splitSymbol}}</span> 公里</div>
                  <div class="num-white">今日更新：<span class="num-yellow">{{title.perUpdateRoadLable | splitSymbol}}</span> 公里</div>
                  <div class="num-white">今日新增：<span class="num-yellow">{{title.perAddRoadLable | splitSymbol}}</span> 公里</div>
              </div>
              <div style='flex:1 1 auto;'>
                <div class="num-white">POI 总量：<span class="num-yellow">{{title.poiNum | splitSymbol}}</span> 个</div>
                <div class="num-white">今日更新：<span class="num-yellow">{{title.perUpdatePoiLable | splitSymbol}}</span> 个</div>
                <div class="num-white">今日新增：<span class="num-yellow">{{title.perAddPoiLable | splitSymbol}}</span> 个</div>
              </div>
            </div>
          </div>
          <div class="legendContainer">
            <div class="legend">
              <div v-on:click="toggleDataSource('common')"><span
                      :class="dataSourceStatus.commonInfoSource? 'commonInfo' : 'commonInfoNone'"></span> 自采分布</div>
              <div v-on:click="toggleDataSource('crowd')"><span
                      :class="dataSourceStatus.crowdInfoSource? 'crowdInfo' : 'crowdInfoNone'"></span> 众包分布</div>
            </div>
          </div>
        </div>
        <div class="col flex-layout-v" style='width:550px;'>
          <div class="row">
            <div class="row top-title right">
              数据出品
            </div>
          </div>
          <div class="row">
            <panel title="日出品">
              <div slot="content">
                <day-chart :dayProduce="charData.dayProduce"></day-chart>
              </div>
            </panel>
          </div>
          <div class="row">
            <panel title="月出品">
              <div slot="content">
                <month-chart :monthProduce="charData.monthProduce"></month-chart>
              </div>
            </panel>
          </div>
          <div class="row">
            <panel title="季出品" :sub-title="season.spVerson">
              <div slot="content">
                <div style='display:flex;color:#DDD;padding:6px'>
                <div style='flex:1 1 auto;'>更新道路 <span class='numberText'>{{season.spUpdateRoad}}</span> 公里</div>
                <div style='flex:1 1 auto;'>新增道路 <span class='numberText'>{{season.spAddRoad}}</span> 公里</div>
              </div>
              <div style='display:flex;color:#DDD;padding:6px'>
                <div style='flex:1 1 auto;'>更新POI <span class='numberText'>{{season.spUpdatePoi}}</span> 个</div>
                <div style='flex:1 1 auto;'>新增POI <span class='numberText'>{{season.spAddPoi}}</span> 个</div>
              </div>
              </div>
            </panel>
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
  import Banner from '@/components/Banner';
  import Global from '@/components/Global';
  import SplitNumber from '@/components/SplitNumber'
  import Panel from '@/components/Panel'
  import axios from 'axios';

  var TWEEN = require('@tweenjs/tween.js');

  export default {
    name: 'app',
    data () {
      return {
        title:{
          perUpdateRoad:0,
          perAddRoad: 0,
          perUpdatePoi: 0,
          perAddPoi:0,
          perAddRoadLable:0,
          perUpdateRoadLable:0,
          perAddPoiLable:0,
          perUpdatePoiLable:0
        },
        crowd:{
        },
        season:{
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
        },
        dataSourceStatus: {
          commonInfoSource: true,
          randomData:Math.random(),
          poiChangedNum: Math.random(),
          crowdInfoSource: true
        }
      }
    },
    filters: {
      splitSymbol: function (value){ // 将数字三位隔开
        return parseInt(value).toLocaleString();
      }
    },
    watch: { // 用于统计信息的过度效果显示
      'title.perAddRoad': {
        handler: function (newValue, oldValue) {
          this.tweenChange('perAddRoadLable', newValue, oldValue);
        }
      },
      'title.perUpdateRoad': {
        handler: function (newValue, oldValue) {
          this.tweenChange('perUpdateRoadLable', newValue, oldValue);
        }
      },
      'title.perAddPoi': {
        handler: function (newValue, oldValue) {
          this.tweenChange('perAddPoiLable', newValue, oldValue);
        }
      },
      'title.perUpdatePoi': {
        handler: function (newValue, oldValue) {
          this.tweenChange('perUpdatePoiLable', newValue, oldValue);
        }
      }
    },
    methods: {
      tweenChange: function (lable, newValue, oldValue) {  // 用于统计信息的过度效果显示
        let vm = this;
        function animate () {
          if (TWEEN.update()) {
            requestAnimationFrame(animate)
          }
        }
        new TWEEN.Tween({ tweeningNumber: oldValue })
        .easing(TWEEN.Easing.Quadratic.Out)
        .to({ tweeningNumber: newValue }, 1000 * 50) // 数据变化持续50秒
        .onUpdate(function () {
          vm.title[lable] = this.tweeningNumber.toFixed(0);
        })
        .start()
        animate()
      },
      getChartData: function () {
        const that = this;
        axios({
          method: 'get',
          url: 'http://fastmap.navinfo.com/service/statics/productMonitor',
          // url: 'http://fs-road.navinfo.com/dev/trunk/service/statics/productMonitor',
        }).then(function (res) {
          if (res && res.data.errcode == 0) {
            that.recomData(res.data.data);
          }
        }).catch(function(err){
        })
      },
      recomData: function (data) { // 格式化接口数据
        this.initOriginData(data);
        this.titleData(data);
        this.recomPoi(data)
        this.recomRoad(data)
        this.recomDayProduce(data);
        this.recomMonthProduce(data);
        this.recomThird(data);
        this.crowdData(data);
        this.seasonData(data);
      },
      seasonData: function (data) {
        this.season.spUpdateRoad = data.spUpdateRoad;
        this.season.spAddRoad = data.spAddRoad;
        this.season.spUpdatePoi = data.spUpdatePoi;
        this.season.spAddPoi = data.spAddPoi;
        this.season.spVerson = data.spVerson;
      },
      crowdData: function (data) { // 众包
        this.crowd.crowdUserNum = data.crowdUserNum;
        this.crowd.crowdRoadLen = data.crowdRoadLen;
        this.crowd.crowdPoiNum = data.crowdPoiNum;
      },
      getCurrentProcess: function (filed, data) {
        let currentHour = new Date().getHours(); // 当前小时
        let step = Math.ceil(data[filed] / 24 * currentHour);
        if (step > data[filed]) {
          step = data[filed];
        }
        return step;
      },
      titleData: function (data) {
        let perAddRoad = data.perAddRoad;
        let times = 60 * 24; // 总共更新的次数 （一分钟刷新一次，24小时刷新60*24次，可以根据具体效果设置时长）
        let intervalTimes = 1000 * 10;
        let that = this;
        if (this.interval) {
          clearInterval(this.interval);
        }

        this.interval = setInterval(function () {
          let improve1 = that.updatePerAddRoad(times, data);
          let improve2 = that.updatePerUpdateRoad(times, data);
          that.title.roadLen = that.title.roadLen + improve1 + improve2;

          let improve3 = that.updatePerAddPoi(times, data);// poi新增每次递增值
          let improve4 = that.updatePerUpdatePoi(times, data); // poi修改每次递增值
          that.title.poiNum = that.title.poiNum + improve3 + improve4;


          that.dataSourceStatus.randomData = Math.random();
          that.dataSourceStatus.poiChangedNum = improve3 + improve4;

          let currentMonth = new Date().getMonth() + 1;
          data.cRoadAverage[currentMonth].add = data.cRoadAverage[currentMonth].add + improve1;
          data.cRoadAverage[currentMonth].update = data.cRoadAverage[currentMonth].update + improve2;
          data.cAddRoad = data.cAddRoad + improve1;
          data.cUpdateRoad = data.cUpdateRoad + improve2;
          data.cPoiAverage[currentMonth].add = data.cPoiAverage[currentMonth].add + improve3;
          data.cPoiAverage[currentMonth].update = data.cPoiAverage[currentMonth].update + improve4;
          data.cAddPoi = data.cAddPoi + improve3;
          data.cUpdatePoi = data.cUpdatePoi + improve4;

          that.recomPoi(data)
          that.recomRoad(data)
        }, intervalTimes);
      },
      updatePerAddRoad: function (times, data) {
        let addStep = 0;
        let step = Math.ceil(data.perAddRoad /times);
        if ((this.title.perAddRoad + step) < data.perAddRoad) {
          this.title.perAddRoad = this.title.perAddRoad + step;
          addStep = step;
        } else {
          addStep = data.perAddRoad - this.title.perAddRoad
          this.title.perAddRoad = data.perAddRoad;
        }
        return addStep;
      },
      updatePerUpdateRoad: function (times, data) {
        let addStep = 0;
        let step = Math.ceil(data.perUpdateRoad /times);
        if ((this.title.perUpdateRoad + step) < data.perUpdateRoad) {
          this.title.perUpdateRoad = this.title.perUpdateRoad + step;
          addStep = step;
        } else {
          addStep = data.perUpdateRoad - this.title.perUpdateRoad;
          this.title.perUpdateRoad = data.perUpdateRoad;
        }
        return addStep;
      },
      updatePerAddPoi: function (times, data) {
        let addStep = 0;
        let step = Math.ceil(data.perAddPoi /times);
        if ((this.title.perAddPoi + step) < data.perAddPoi) {
          this.title.perAddPoi = this.title.perAddPoi + step;
          addStep = step;
        } else {
          addStep = data.perAddPoi - this.title.perAddPoi
          this.title.perAddPoi = data.perAddPoi;
        }
        return addStep;
      },
      updatePerUpdatePoi: function (times, data) {
        let addStep = 0;
        let step = Math.ceil(data.perUpdatePoi /times);
        if ((this.title.perUpdatePoi + step) < data.perUpdatePoi) {
          this.title.perUpdatePoi = this.title.perUpdatePoi + step;
          addStep = step;
        } else {
          addStep = data.perUpdatePoi - this.title.perUpdatePoi;
          this.title.perUpdatePoi = data.perUpdatePoi;
        }

        return addStep;
      },
      initOriginData: function (data) {
        // 根据当前的时间设置初始值
        this.title.perUpdateRoad = this.getCurrentProcess('perUpdateRoad', data);
        this.title.perAddRoad = this.getCurrentProcess('perAddRoad', data);
        this.title.perUpdatePoi = this.getCurrentProcess('perUpdatePoi', data);
        this.title.perAddPoi = this.getCurrentProcess('perAddPoi', data);

        // 重置总量 poi和道路的界面显示值 等于 总数量-今日新增-今日更新+新增初始值+更新初始值
        data.roadLen = data.roadLen - data.perAddRoad - data.perUpdateRoad + this.title.perUpdateRoad + this.title.perAddRoad;
        data.poiNum = data.poiNum - data.perAddPoi - data.perUpdatePoi  + this.title.perAddPoi + this.title.perUpdatePoi;
        this.title.roadLen = data.roadLen;
        this.title.poiNum = data.poiNum;
        // 初始化自采道路图表
        let currentMonth = new Date().getMonth() + 1;
        data.cRoadAverage[currentMonth].add = data.cRoadAverage[currentMonth].add - data.perAddRoad + this.title.perAddRoad;
        data.cRoadAverage[currentMonth].update = data.cRoadAverage[currentMonth].update - data.perUpdateRoad + this.title.perUpdateRoad;
        data.cAddRoad = data.cAddRoad - data.perAddRoad + this.title.perAddRoad;
        data.cUpdateRoad = data.cUpdateRoad - data.perUpdateRoad + this.title.perUpdateRoad;

        data.cPoiAverage[currentMonth].add = data.cPoiAverage[currentMonth].add - data.perAddPoi + this.title.perAddPoi;
        data.cPoiAverage[currentMonth].update = data.cPoiAverage[currentMonth].update - data.perUpdatePoi + this.title.perUpdatePoi;
        data.cAddPoi = data.cAddPoi - data.perAddPoi + this.title.perAddPoi;
        data.cUpdatePoi = data.cUpdatePoi - data.perUpdatePoi + this.title.perUpdatePoi;
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
        this.charData.thrid.lineData = [[],[],[]];
        this.charData.thrid.xAxis = [];
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
        this.charData.dayProduce.yAxis = [`新增POI ${data.dpAddPoi} 个`,`更新POI ${data.dpUpdatePoi} 个`,`新增道路 ${data.dpAddRoad} 公里`,`更新道路 ${data.dpUpdateRoad} 公里`];
      },
      recomMonthProduce: function (data) { // 重组road数据,使之符合图表格式
        this.charData.monthProduce.barData = [data.mpAddPoi, data.mpUpdatePoi, data.mpAddRoad, data.mpUpdateRoad];
        this.charData.monthProduce.lineData = [data.mpAverage.addPoi, data.mpAverage.updatePoi, data.mpAverage.addRoad, data.mpAverage.updateRoad];
        this.charData.monthProduce.yAxis = [`新增POI ${data.mpAddPoi} 个`,`更新POI ${data.mpUpdatePoi} 个`,`新增道路 ${data.mpAddRoad} 公里`,`更新道路 ${data.mpUpdateRoad} 公里`];
      },
      toggleDataSource: function(type) {
        if (type === 'common'){
          this.dataSourceStatus.commonInfoSource = !this.dataSourceStatus.commonInfoSource;
        }else {
          this.dataSourceStatus.crowdInfoSource = !this.dataSourceStatus.crowdInfoSource;
        }
      }
    },
    created () {
      this.getChartData();
      setInterval(function () {
        var date = new Date();
        if (date.getHours() == 23) { // 每天23点执行一次
          this.getChartData();
        }
      }, 1000*60*60)
    },
    beforeDestroy () {
      clearInterval(this.interval);
    },
    components: {
      BarPoiChart,
      BarRoadChart,
      LineChart,
      DayChart,
      MonthChart,
      Banner,
      SplitNumber,
      Global,
      Panel
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
    font-size: 48px;
    font-weight: bold;
  }

  div.header>div.title.h2 {
    font-size: 34px;
  }

  div.header>div.title.h3 {
    font-size: 34px;
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
    cursor: pointer;
    pointer-events: auto;
  }

  div.legendContainer div.legend span{
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: bottom;
  }

  div.legendContainer div.legend span.commonInfo{
    background-color: #CC3333;
  }
  div.legendContainer div.legend span.commonInfoNone{
    background-color: #9da0a4;
  }

  div.legendContainer div.legend span.crowdInfo{
    background-color: #FFCC00;
  }

  div.legendContainer div.legend span.crowdInfoNone{
    background-color: #9da0a4;
  }

  .num-yellow {
    font-size: 24px;
    color: #fd8e2a;
  }

  .num-white {
    font-size: 24px;
    color: #fff;
    padding: 4px 0px;
  }

  .text-yellow {
    text-align: center;
    font-weight: bold;
    font-size: 34px;
    color: #3333FF;
    padding: 10px 0;
  }

  .text-yellow-subTitle {
    text-align: left;
    font-weight: bold;
    font-size: 24px;
    color: #DDD;
    padding: 10px 0;
  }

  .numberText{
    color: #FD8E20;
  }

  .top-title {
      height: 135px;
      width: 547px;
      color: #47a2ff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: MicrosoftYaHei-Bold;
      font-size: 32px;
      font-weight: bold;
  }

  .top-title.left {
    background: url(./assets/juxing_2.png) no-repeat;
  }

  .top-title.right {
    background: url(./assets/juxing_3.png) no-repeat;
  }

  .center-content {
    background: url('./assets/jxuing_1.png') no-repeat;
    background-position: center;
    background-size: 100%;
    min-width: 611px;
    height: 265px;
  }
  .center-content .date-text {
    color: #47a2ff;
    font-size: 21px;
  }
  .center-foot {
    background: url('./assets/juxing_4.png') no-repeat;
  }
</style>
