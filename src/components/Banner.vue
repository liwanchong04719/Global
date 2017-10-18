<template>
  <div class="banner">
    <div class="datetime">Date:{{date}}</div>    
    <img src="../assets/ziti.png">
    <div class="datetime">Time:{{time}}</div>
  </div>
</template>

<script>
function lpad(str, len, char) {
  let s = str.toString();
  let c = char || ' ';
  c = c.toString();
  while (s.length < len) {
    s = c + s;
  }
  return s;
}

export default {
  name: 'banner',
  props: ['flag'],
  data() {
    return {
      date: '',
      time: '',
      interval: null,
    };
  },
  methods: {
    getDateTime() {
      const d = new Date();
      this.date = `${d.getFullYear()}-${lpad((d.getMonth() + 1), 2, '0')}-${lpad(d.getDate(), 2, '0')}`;
      this.time = `${lpad(d.getHours(), 2, '0')}:${lpad(d.getMinutes(), 2, '0')}:${lpad(d.getSeconds(), 2, '0')}`;
    },
    refreshDateTime() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }

      this.interval = setInterval(() => {
        this.getDateTime();
      }, 1000);
    },
  },
  mounted() {
    this.refreshDateTime();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.banner {
  display: flex;
  justify-content: space-between;  
}

.datetime {
  font-size: 21px;
  color: #47a2ff;
  text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0);
}
</style>
