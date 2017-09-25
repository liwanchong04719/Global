<template>
  <div class="banner">
    <div class="logo">
      <img src="../assets/navinfo.svg" style="width:240px;height: 80px;">
      <div style="padding: 0px 14px;">( SZSE Code：002405 )</div>
    </div>
    <slot name="title"></slot>
    <div class="datetime" @click="getDateTime()">
      <div class="time">{{time}}</div>
      <div class="date">{{date}}</div>
    </div>
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
  /* height: 160px; */
  background: #222;
  display: flex;
  justify-content: space-between;
  color: #fff;
}

.logo {
  width: 240px;
  height: 80px;
  color: darkgray;
  font-size: 18px;
  /* text-align: center; */
  /* background: url('../assets/navinfo.svg') no-repeat center center transparent;
  background-size: contain; */
}

.datetime {
  align-self: center;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  padding: 0px 15px;
  color: #fff;
}

.datetime>div {
  padding: 5px;
  text-align: right;
}

.datetime>.date {
  font-size: 24px;
}

.datetime>.time {
  font-size: 32px;
}
</style>
