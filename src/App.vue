<template>
  <div class="flex-layout-v fm-stretch">
    <router-view></router-view>
    <div class="flex-layout-v fm-stretch float">
      <banner class="row" style="flex: 1 0 140px;">
        <div slot="title" class="flex-layout-v header" style="align-self: flex-start; align-items: center;">
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
      </banner>
      <div class="row fm-stretch flex-layout" style="margin-top: -20px;">
        <div class="col flex-layout-v">
          <div class="row col-title">
            数据来源
          </div>
          <div class="fm-stretch flex-layout-v">
            <panel>
              <div slot="header">自采</div>
              <div slot="content" style="width: 300px;">
              </div>
            </panel>
            <panel>
              <div slot="header">第三方数据</div>
              <div slot="content">
                <div style="width: 300px;"></div>
              </div>
            </panel>
            <panel>
              <div slot="header">众包</div>
              <div slot="content"></div>
            </panel>
          </div>
        </div>
        <div class="col flex-layout-v">
          <div class="row col-title">
            数据出品
          </div>
          <div class="fm-stretch flex-layout-v">
            <panel>
              <div slot="header">日出品</div>
              <div slot="content"></div>
            </panel>
            <panel>
              <div slot="header">月出品</div>
              <div slot="content"></div>
            </panel>
            <panel>
              <div slot="header">季出品 17秋</div>
              <div slot="content"></div>
            </panel>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from './components/Banner';
import Panel from './components/Panel';

export default {
  name: 'app',
  components: {
    Banner,
    Panel,
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
}

div.flex-layout-v {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
}

div.flex-layout>div.col {
  height: 100%;
}

div.flex-layout-v>div.row {
  width: 100%;
}

div.float {
  position: absolute;
  top: 0px;
  left: 0px;
  pointer-events: none;
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

.col-title {
  padding-bottom: 10px;
  text-align: center;
  font-weight: bold;
  font-size: 32px;
  color: yellow;
}
</style>
