<template>
  <div class="fm-stretch layout-v">
    <banner></banner>
    <router-view></router-view>
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
/* 纵向布局 */
.layout-v {
  display: flex;
  flex-flow: column nowrap;
}
</style>
