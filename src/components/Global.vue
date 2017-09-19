<template>
    <div id="global" class="global">
        <h1>{{ msg }}</h1>
    </div>
</template>

<script>
  import Cesium from 'cesium';

  export default {
    el: '#global',
    name: 'global',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
      };
    },
    mounted() {
      const viewer = new Cesium.Viewer('global');
      console.log(viewer);
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>