<template>
  <div class="fm-panel">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>

export default {
  name: 'panel',
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
}

.fm-panel>.header {
  padding: 5px 10px;
  color: yellow;
  font-size: 24px;
}

.fm-panel>.content {
  flex: 1 0 100px;
  width: 100%;
  height: 100%;  
}
</style>
