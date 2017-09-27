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
              <bar-poi-chart :roadData='charData.poi'></bar-poi-chart>
            </div>
          </div>
          <div class="row">
            <div class="panel" style="width: 400px;">
              <bar-road-chart :roadData='charData.poi'></bar-road-chart>
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
              <day-chart></day-chart>
            </div>
          </div>
          <div class="row">
            <div class="panel" style="height: 100px;width: 400px;">
              <div class="row text-yellow-subTitle">月出品</div>
              <month-chart></month-chart>
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
        road: {
            seriesData:[],
            xAxis:[]
        }
      }
    }
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
</style>
