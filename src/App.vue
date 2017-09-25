<template>
  <div class="flex-layout-v fm-stretch">
    <router-view></router-view>
    <div class="flex-layout-v fm-stretch float">
      <banner class="row">
        <div slot="title" class="flex-layout-v" style="width: 500px; height: 140px;align-items: center;">
          <div class="panel" style="height:100px;width: 400px;"></div>
          <div class="panel" style="height:40px;width: 300px;"></div>
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
}

div.flex-layout-v {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
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
  background-color: red;
}
</style>
