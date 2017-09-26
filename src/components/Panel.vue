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
  pointer-events: auto;
}

.fm-panel>.header {
  flex: 0 0 auto;
  padding: 5px 10px;
  color: yellow;
  font-size: 24px;
  border: 1px solid blue;
}

.fm-panel>.content {
  flex: 1 0 100px;
  border: 1px solid red;
}
</style>
