<template>
  <div class="flex-layout-v fm-stretch">
    <router-view></router-view>
    <div class="flex-layout-v fm-stretch float">
      <div class="row fm-stretch flex-layout">
        <div class="col flex-layout-v">
          <div class="logo">
            <img src="./assets/navinfo.svg" style="width:240px;height: 80px;">
            <div style="padding: 0px 14px;color: #fff">( SZSE Code: 002405 )</div>
          </div>
          <div class="row text-yellow">
            数据来源
          </div>
          <div class="row">
            <div class="panel" style="height: 100px;width: 200px;"></div>
          </div>
          <div class="row">
            <div class="panel" style="height: 100px;width: 300px;"></div>
          </div>
          <div class="row">
            <div class="panel" style="height: 100px;width: 200px;"></div>
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
          <Banner></Banner>
          <div class="row text-yellow">
            数据出品
          </div>
          <div class="row">
            <div class="panel" style="height: 100px;width: 200px;"></div>
          </div>
          <div class="row">
            <div class="panel" style="height: 100px;width: 300px;"></div>
          </div>
          <div class="row">
            <div class="panel" style="height: 100px;width: 200px;"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from './components/Banner';

export default {
  name: 'app',
  components: {
    Banner,
  },
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
  background-color: gray;
}

div.header>div.title {
  padding: 10px 10px 0px 10px;
  color: #fff;
}
div.header>div.title:last-child {
  padding-bottom: 10px;
}

div.header>div.title.h1 {
  font-size: 30px;
  font-weight: bold;
}

div.header>div.title.h2 {
  font-size: 26px;
}

div.header>div.title.h3 {
  font-size: 20px;
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
}
</style>
