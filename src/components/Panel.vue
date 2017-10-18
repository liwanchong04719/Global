<template>
  <div class="fm-panel">
    <div class="header">
      <div class="title">{{title}}</div>
      <div class="subTitle" v-show="subTitle">{{subTitle}}</div>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>

export default {
  name: 'panel',
  props: ['title', 'subTitle'],
  data() {
    return {};
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fm-panel {
  display: flex;
  flex-flow: column nowrap;
  pointer-events: auto;
  padding-left: 26px;
}

.fm-panel>.header {
  display: flex;
  align-items: center;
}

.fm-panel>.header>.title {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 169px;
  height: 70px;
  padding: 0px;
  margin: 0px;
  background: url(../assets/juxing_5.png) no-repeat;
}

.fm-panel>.header>.subTitle {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.fm-panel>.content {
  flex: 1 0 100px;
  padding-left: 20px;
}
</style>
