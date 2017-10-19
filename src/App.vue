<template>
  <div class="fm-stretch">
    <Global :randomData="dataSourceStatus.randomData" :poiChangedNum="dataSourceStatus.poiChangedNum" :crowdInfoSource='dataSourceStatus.crowdInfoSource' :commonInfoSource='dataSourceStatus.commonInfoSource'></Global>
    <div class="fm-stretch flex-layout float">
      <div class="col flex-layout-v">
        <div class="top-title left">
          <div class="text">
            数据来源
          </div>
        </div>
        <div class="flex-layout-v" style="height: 100%;">
          <panel title="自采">
            <div slot="content">
              <div>
                <bar-road-chart :roadData='charData.road'></bar-road-chart>
              </div>
              <div>
                <bar-poi-chart :poiData='charData.poi'></bar-poi-chart>
              </div>
            </div>
          </panel>
          <panel title="第三方数据">
            <div slot="content">
              <line-chart :chartData='charData.thrid'></line-chart>
            </div>
          </panel>
          <panel title="众包">
            <div slot="content" class="flex-layout-v" style="color:#DDD;">
              <div class="flex-layout remark" style="align-items: flex-start;">
                <div>用户总量</div>
                <div>
                  <span class='num-text'>{{crowd.crowdUserNum}}</span> 个
                </div>
              </div>
              <div class="flex-layout remark" style='align-items: flex-start;'>
                <div>全年累积</div>
                <div class="remark">
                  <div>采集道路</div>
                  <div>采集poi</div>
                </div>
                <div class="remark">
                  <div><span class='num-text'>{{crowd.crowdRoadLen}}</span> 公里</div>
                  <div><span class='num-text'>{{crowd.crowdPoiNum}}</span> 个</div>
                </div>
              </div>
            </div>
          </panel>
        </div>
        <div class="bottom-title left">
          <div class="text">
            Data Sources
          </div>
        </div>
      </div>
      <div class="flex-layout-v fm-stretch" style="align-items: center;">
        <div class="center-content">
          <div style="margin: 0px -80px;">
            <banner></banner>
          </div>
          <div class="flex-layout summary" style="padding: 10px;">
            <div>
              <div>
                道路总里程：
                <span class="num-text">{{title.roadLen | splitSymbol}}</span> 公里
              </div>
              <div>
                今日更新：
                <span class="num-text" :style="{'background-color': tweenColor}">{{title.perUpdateRoadLable | splitSymbol}}</span> 公里
              </div>
              <div>
                今日新增：
                <span class="num-text" :style="{'background-color': tweenColor}">{{title.perAddRoadLable | splitSymbol}}</span> 公里
              </div>
            </div>
            <div>
              <div>
                POI 总量：
                <span class="num-text" >{{title.poiNum | splitSymbol}}</span> 个
              </div>
              <div>
                今日更新：
                <span class="num-text" :style="{'background-color': tweenColor}">{{title.perUpdatePoiLable | splitSymbol}}</span> 个
              </div>
              <div>
                今日新增：
                <span class="num-text" :style="{'background-color': tweenColor}">{{title.perAddPoiLable | splitSymbol}}</span> 个
              </div>
            </div>
          </div>
        </div>
        <div class="legendContainer">
          <div class="legend">
            <div v-on:click="toggleDataSource('common')">
              <span :class="test1"></span> 自采分布
            </div>
            <div v-on:click="toggleDataSource('crowd')">
              <span :class="test2"></span> 众包分布
            </div>
          </div>
        </div>
      </div>
      <div class="col flex-layout-v" style="align-items: flex-end;">
        <div class="top-title right">
          <div class="text">
            数据出品
          </div>
        </div>
        <div class="flex-layout-v" style="height: 100%;">
          <panel title="日出品">
            <div slot="content">
              <day-chart :dayProduce="charData.dayProduce"></day-chart>
            </div>
          </panel>
          <panel title="月出品">
            <div slot="content">
              <month-chart :monthProduce="charData.monthProduce"></month-chart>
            </div>
          </panel>
          <panel title="季出品" :sub-title="season.spVerson">
            <div slot="content" class="flex-layout-v" style="color:#DDD;">
              <div class="flex-layout remark" style="align-items: flex-start;">
                <div>更新道路 <span class="num-text">{{season.spUpdateRoad}}</span> 公里</div>
                <div>新增道路 <span class="num-text">{{season.spAddRoad}}</span> 公里</div>
              </div>
              <div class="flex-layout remark" style="align-items: flex-start;">
                <div>更新POI <span class="num-text">{{season.spUpdatePoi}}</span> 个</div>
                <div>新增POI <span class="num-text">{{season.spAddPoi}}</span> 个</div>
              </div>
            </div>
          </panel>
        </div>
        <div class="bottom-title right">
          <div class="text">
            Data Products
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
    data() {
      return {
        title: {
          perUpdateRoad: 0,
          perAddRoad: 0,
          perUpdatePoi: 0,
          perAddPoi: 0,
          perAddRoadLable: 0,
          perUpdateRoadLable: 0,
          perAddPoiLable: 0,
          perUpdatePoiLable: 0
        },
        crowd: {},
        season: {},
        charData: {
          poi: {
            newData: [],
            updateData: [],
            xAxis: [],
            cUpdatePoi: 0,
            cAddPoi: 0
          },
          road: {
            newData: [],
            updateData: [],
            xAxis: [],
            cUpdateRoad: 0,
            cAddRoad: 0
          },
          dayProduce: {
            barData: [],
            lineData: [],
            yAxis: []
          },
          monthProduce: {
            barData: [],
            lineData: [],
            yAxis: []
          },
          thrid: {
            lineData: [
              [],
              [],
              []
            ], //  用户轨迹点,用户问题反馈,互联网信息
            xAxis: []
          }
        },
        dataSourceStatus: {
          commonInfoSource: true,
          randomData: Math.random(),
          poiChangedNum: Math.random(),
          crowdInfoSource: true
        },
        timeout: null,
        tweenColor: ''
      }
    },
    computed: {
      test1: function() {
        return this.dataSourceStatus.commonInfoSource ? 'commonInfo' : 'commonInfoNone';
      },
      test2: function() {
        return this.dataSourceStatus.crowdInfoSource ? 'crowdInfo' : 'crowdInfoNone';
      }
    },
    filters: {
      splitSymbol: function(value) { // 将数字三位隔开
        return parseInt(value).toLocaleString();
      }
    },
    watch: { // 用于统计信息的过度效果显示
      'title.perAddRoad': {
        handler: function(newValue, oldValue) {
          this.tweenChange('perAddRoadLable', newValue, oldValue);
        }
      },
      'title.perUpdateRoad': {
        handler: function(newValue, oldValue) {
          this.tweenChange('perUpdateRoadLable', newValue, oldValue);
        }
      },
      'title.perAddPoi': {
        handler: function(newValue, oldValue) {
          this.tweenChange('perAddPoiLable', newValue, oldValue);
        }
      },
      'title.perUpdatePoi': {
        handler: function(newValue, oldValue) {
          this.tweenChange('perUpdatePoiLable', newValue, oldValue);
        }
      }
    },
    methods: {
      tweenChange: function(lable, newValue, oldValue) { // 用于统计信息的过度效果显示
        let vm = this;
        function animate() {
          if (TWEEN.update()) {
            requestAnimationFrame(animate)
          }
        }
        let t = new TWEEN.Tween({
            tweeningNumber: oldValue
          })
          .easing(TWEEN.Easing.Quadratic.Out)
          .to({
            tweeningNumber: newValue
          }, 1000 * 2) // 数据变化持续2秒
          .onUpdate(function() {
            vm.title[lable] = this.tweeningNumber.toFixed(0);
            vm.tweenColor = '#fff';
          })
          .onComplete(function () {
            vm.tweenColor = '';
          })
          .start();
        animate();
      },
      getChartData: function() {
        const that = this;
        axios({
          method: 'get',
          url: 'http://fastmap.navinfo.com/service/statics/productMonitor',
          // url: 'http://fs-road.navinfo.com/dev/trunk/service/statics/productMonitor',
        }).then(function(res) {
          if (res && res.data.errcode == 0) {
            that.recomData(res.data.data);
          }
        }).catch(function(err) {})
      },
      recomData: function(data) { // 格式化接口数据
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
      seasonData: function(data) {
        this.season.spUpdateRoad = data.spUpdateRoad;
        this.season.spAddRoad = data.spAddRoad;
        this.season.spUpdatePoi = data.spUpdatePoi;
        this.season.spAddPoi = data.spAddPoi;
        this.season.spVerson = data.spVerson;
      },
      crowdData: function(data) { // 众包
        this.crowd.crowdUserNum = data.crowdUserNum;
        this.crowd.crowdRoadLen = data.crowdRoadLen;
        this.crowd.crowdPoiNum = data.crowdPoiNum;
      },
      getCurrentProcess: function(filed, data) {
        let currentHour = new Date().getHours() - 8; // 当前小时
        let step = Math.ceil(data[filed] / 15 * currentHour);
        if (step > data[filed]) {
          step = data[filed];
        }
        return step;
      },
      titleData: function(data) {
        let perAddRoad = data.perAddRoad;
        let times = 60 * 15 * 2; // 总共更新的次数 （一分钟刷新一次，24小时刷新60*24次，可以根据具体效果设置时长）
        let intervalTimes = 1000 * 30;
        let that = this;
        if (this.timeout) {
          clearTimeout(this.timeout);
        }        

        let _refreshData = function() {
          let improve1 = that.updatePerAddRoad(times, data);
          let improve2 = that.updatePerUpdateRoad(times, data);          
          let improve3 = that.updatePerAddPoi(times, data); // poi新增每次递增值
          let improve4 = that.updatePerUpdatePoi(times, data); // poi修改每次递增值

          that.title.roadLen = that.title.roadLen + improve1 + improve2;
          that.title.poiNum = that.title.poiNum + improve3 + improve4;
          that.dataSourceStatus.randomData = Math.random();
          // that.dataSourceStatus.poiChangedNum = improve3 + improve4;
          that.dataSourceStatus.poiChangedNum = 5 + (parseInt(20 * Math.random()))
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
        };

        let _startTimer = function () {
          const timer = (10 + (parseInt(20 * Math.random()))) * 1000;
          that.timeout = setTimeout(function() {
            _refreshData();
            _startTimer();
          }, timer);
        };

        _startTimer();
      },
      updatePerAddRoad: function(times, data) {
        let addStep = 0;
        // let step = Math.ceil(data.perAddRoad / times);
        let step = parseInt(3 * Math.random());
        if ((this.title.perAddRoad + step) < data.perAddRoad) {
          this.title.perAddRoad = this.title.perAddRoad + step;
          addStep = step;
        } else {
          addStep = data.perAddRoad - this.title.perAddRoad
          this.title.perAddRoad = data.perAddRoad;
        }
        return addStep;
      },
      updatePerUpdateRoad: function(times, data) {
        let addStep = 0;
        // let step = Math.ceil(data.perUpdateRoad / times);
        let step = parseInt(5 * Math.random());
        if ((this.title.perUpdateRoad + step) < data.perUpdateRoad) {
          this.title.perUpdateRoad = this.title.perUpdateRoad + step;
          addStep = step;
        } else {
          addStep = data.perUpdateRoad - this.title.perUpdateRoad;
          this.title.perUpdateRoad = data.perUpdateRoad;
        }
        return addStep;
      },
      updatePerAddPoi: function(times, data) {
        let addStep = 0;
        // let step = Math.ceil(data.perAddPoi / times);
        let step = 10 + parseInt(10 * Math.random()); 
        if ((this.title.perAddPoi + step) < data.perAddPoi) {
          this.title.perAddPoi = this.title.perAddPoi + step;
          addStep = step;
        } else {
          addStep = data.perAddPoi - this.title.perAddPoi
          this.title.perAddPoi = data.perAddPoi;
        }
        return addStep;
      },
      updatePerUpdatePoi: function(times, data) {
        let addStep = 0;
        // let step = Math.ceil(data.perUpdatePoi / times);
        let step = 20 + parseInt(10 * Math.random()); 
        if ((this.title.perUpdatePoi + step) < data.perUpdatePoi) {
          this.title.perUpdatePoi = this.title.perUpdatePoi + step;
          addStep = step;
        } else {
          addStep = data.perUpdatePoi - this.title.perUpdatePoi;
          this.title.perUpdatePoi = data.perUpdatePoi;
        }
        return addStep;
      },
      initOriginData: function(data) {
        // 根据当前的时间设置初始值
        this.title.perUpdateRoad = this.getCurrentProcess('perUpdateRoad', data);
        this.title.perAddRoad = this.getCurrentProcess('perAddRoad', data);
        this.title.perUpdatePoi = this.getCurrentProcess('perUpdatePoi', data);
        this.title.perAddPoi = this.getCurrentProcess('perAddPoi', data);
        // 重置总量 poi和道路的界面显示值 等于 总数量-今日新增-今日更新+新增初始值+更新初始值
        data.roadLen = data.roadLen - data.perAddRoad - data.perUpdateRoad + this.title.perUpdateRoad + this.title.perAddRoad;
        data.poiNum = data.poiNum - data.perAddPoi - data.perUpdatePoi + this.title.perAddPoi + this.title.perUpdatePoi;
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
      recomPoi: function(data) { // 重组poi数据,使之符合图表格式
        let poiAvg = data.cPoiAverage;
        this.charData.poi.cUpdatePoi = data.cUpdatePoi;
        this.charData.poi.cAddPoi = data.cAddPoi;
        this.charData.poi.newData = [];
        this.charData.poi.updateData = [];
        this.charData.poi.xAxis = [];
        for (let i in poiAvg) {
          if (poiAvg.hasOwnProperty(i)) {
            this.charData.poi.xAxis.push(i + '月');
            this.charData.poi.newData.push(poiAvg[i].add);
            this.charData.poi.updateData.push(poiAvg[i].update);
          };
        }
      },
      recomRoad: function(data) { // 重组road数据,使之符合图表格式
        let roadAvg = data.cRoadAverage;
        this.charData.road.cUpdateRoad = data.cUpdateRoad;
        this.charData.road.cAddRoad = data.cAddRoad;
        this.charData.road.newData = [];
        this.charData.road.updateData = [];
        this.charData.road.xAxis = [];
        for (let i in roadAvg) {
          if (roadAvg.hasOwnProperty(i)) {
            this.charData.road.xAxis.push(i + '月');
            this.charData.road.newData.push(roadAvg[i].add);
            this.charData.road.updateData.push(roadAvg[i].update);
          };
        }
      },
      recomThird: function(data) { // 重组road数据,使之符合图表格式
        let inforDetail = data.thirdInforDetail; // 用户轨迹点 -- 数据情报收集详情
        let userDetail = data.thirdUserDetail; // 用户问题反馈  -- 用户反馈详情
        let webDetail = data.thirdWebDetail; // 互联网信息  -- 互联网信息详情
        let inforTotal = data.thirdInforTotal; // 用户轨迹点 -- 数据情报收集
        let userTotal = data.thirdUserTotal; // 用户问题反馈  -- 用户反馈
        let webTotal = data.thirdWebTotal; // 互联网信息  -- 互联网信息
        this.charData.thrid.inforTotal = inforTotal;
        this.charData.thrid.userTotal = userTotal;
        this.charData.thrid.webTotal = webTotal;
        this.charData.thrid.lineData = [
          [],
          [],
          []
        ];
        this.charData.thrid.xAxis = [];
        for (let i in inforDetail) {
          if (inforDetail.hasOwnProperty(i)) {
            this.charData.thrid.xAxis.push(i + '月');
            this.charData.thrid.lineData[0].push(inforDetail[i]);
            this.charData.thrid.lineData[1].push(userDetail[i]);
            this.charData.thrid.lineData[2].push(webDetail[i]);
          };
        }
      },
      recomDayProduce: function(data) { // 重组road数据,使之符合图表格式
        this.charData.dayProduce.barData = [data.dpAddPoi, data.dpUpdatePoi, data.dpAddRoad, data.dpUpdateRoad];
        this.charData.dayProduce.lineData = [data.dpAverage.addPoi, data.dpAverage.updatePoi, data.dpAverage.addRoad, data.dpAverage.updateRoad];
        this.charData.dayProduce.yAxis = [`新增POI ${data.dpAddPoi} 个`, `更新POI ${data.dpUpdatePoi} 个`, `新增道路 ${data.dpAddRoad} 公里`, `更新道路 ${data.dpUpdateRoad} 公里`];
      },
      recomMonthProduce: function(data) { // 重组road数据,使之符合图表格式
        this.charData.monthProduce.barData = [data.mpAddPoi, data.mpUpdatePoi, data.mpAddRoad, data.mpUpdateRoad];
        this.charData.monthProduce.lineData = [data.mpAverage.addPoi, data.mpAverage.updatePoi, data.mpAverage.addRoad, data.mpAverage.updateRoad];
        this.charData.monthProduce.yAxis = [`新增POI ${data.mpAddPoi} 个`, `更新POI ${data.mpUpdatePoi} 个`, `新增道路 ${data.mpAddRoad} 公里`, `更新道路 ${data.mpUpdateRoad} 公里`];
      },
      toggleDataSource: function(type) {
        if (type === 'common') {
          this.dataSourceStatus.commonInfoSource = !this.dataSourceStatus.commonInfoSource;
        } else {
          this.dataSourceStatus.crowdInfoSource = !this.dataSourceStatus.crowdInfoSource;
        }
      }
    },
    created() {
      this.getChartData();
      setInterval(function() {
        var date = new Date();
        if (date.getHours() == 23) { // 每天23点执行一次
          this.getChartData();
        }
      }, 1000 * 60 * 60)
    },
    beforeDestroy() {
      clearTimeout(this.timeout);
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
  div.fm-stretch {
    width: 100%;
    height: 100%;
  }
  div.flex-layout {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
  }
  div.flex-layout-v {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    align-items: flex-start;
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
  div.legendContainer {
    padding: 10px;
  }
  div.legendContainer div.legend {
    display: inline-block;
  }
  div.legendContainer div.legend>div {
    color: #fff;
    font-weight: 500;
    display: inline-block;
    line-height: 18px;
    cursor: pointer;
    pointer-events: auto;
    padding: 10px;
  }
  div.legendContainer div.legend span {
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: bottom;
  }
  div.legendContainer div.legend span.commonInfo {
    background-color: #CC3333;
  }
  div.legendContainer div.legend span.commonInfoNone {
    background-color: #9da0a4;
  }
  div.legendContainer div.legend span.crowdInfo {
    background-color: #FFCC00;
  }
  div.legendContainer div.legend span.crowdInfoNone {
    background-color: #9da0a4;
  }
  .num-text {
    color: #FD8E20;
  }
  .remark {
    font-size: 16px;
    color: #DDD;
  }
  .remark>div:not(.remark) {
    padding: 6px 12px;
  }
  .center-content {
    width: 100%;
    height: 250px;
    padding: 12px 150px 0px 150px;
    margin: 0px -150px;
    background: url(./assets/juxing_1.png) no-repeat top/contain;
  }
  .center-content>.summary {
    font-size: 24px;
    color: #fff;
  }
  .top-title {
    flex: 0 0 153px;
    width: 547px;
    display: flex;
    justify-content: center;
  }
  .top-title.left {
    background: url(./assets/juxing_2.png) no-repeat center;
  }
  .top-title.right {
    background: url(./assets/juxing_3.png) no-repeat center;
  }
  .top-title>.text {
    color: #47a2ff;
    font-size: 32px;
    font-weight: bold;
    padding-top: 46px;
  }
  .bottom-title {
    flex: 0 0 83px;
    width: 620px;
    color: #47a2ff;
    display: flex;
    justify-content: center;
  }
  .bottom-title.left {
    background: url(./assets/juxing_4.png) no-repeat center;
  }
  .bottom-title.right {
    background: url(./assets/juxing_6.png) no-repeat center;
  }
  .bottom-title>.text {
    color: #47a2ff;
    font-size: 24px;
    font-weight: bold;
    padding-top: 50px;
  }
</style>
