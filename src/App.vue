<template>
  <div class="flex-layout-v fm-stretch">
    <router-view></router-view>
    <div class="flex-layout-v fm-stretch float">
      <banner class="row" style="flex: 1 0 160px;">
        <div slot="title" class="flex-layout-v header" style="align-self: flex-start;">
          <div class="desc h1">
            地图母库概览 Core Map Review
          </div>
          <div class="desc h2">
            道路总里程：
            <span class="num-yellow">6,548,99</span> 公里 POI总数量：
            <span class="num-yellow">23,108,647</span> 个
          </div>
          <div class="desc h3">
            今天 道路更新：
            <span class="num-white">6,548,99</span> 公里 新增道路：
            <span class="num-white">108,647</span> 公里
          </div>
          <div class="desc h3">
            POI更新：
            <span class="num-white">23,108,647</span> 个 新增：
            <span class="num-white">108,647</span> 个
          </div>
        </div>
      </banner>
      <div class="row fm-stretch flex-layout" style="margin-top: -20px;">
        <div class="col flex-layout-v">
          <div class="row">
            <div class="panel" style="height: 200px;width: 200px;"></div>
          </div>
          <div class="row">
            <div class="panel" style="height: 300px;width: 300px;"></div>
          </div>
          <div class="row">
            <div class="panel" style="height: 200px;width: 200px;"></div>
          </div>
          <div class="row">
            <div class="panel" style="height: 200px;width: 200px;"></div>
          </div>
        </div>
        <div class="col flex-layout-v">
          <div class="row">
            <div class="panel" style="height: 200px;width: 200px;"></div>
          </div>
          <div class="row">
            <div class="panel" style="height: 400px;width: 300px;"></div>
          </div>
          <div class="row">
            <div class="panel" style="height: 200px;width: 200px;"></div>
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

#app {
  width: 100%;
  height: 100%;
  min-height: 600px;
  min-width: 800px;
  font-family: 'Microsoft YaHei', 'Helvetica Neue', 'Hiragino Sans GB', '微软雅黑', '黑体', Arial, sans-serif !important;
  font-size: 12px;
  background: #fff;
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

div.header>div.desc {
  padding: 10px 10px 0px 10px;
}

div.header>div.desc.h1 {
  font-size: 42px;
  font-weight: bold;
}

div.header>div.desc.h2 {
  font-size: 32px;
}

div.header>div.desc.h3 {
  font-size: 24px;
}

span.num-yellow {
  font-weight: bold;
  font-size: 42px;
  color: yellow;
}

span.num-white {
  font-weight: bold;
  font-size: 32px;
  color: #fff;
}
</style>
