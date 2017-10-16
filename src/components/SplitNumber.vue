<template>
  <div class='price-div'>
    <div v-for="item in valArr">
      <div v-if="item == ','" class='sign'>{{item}}</div>
      <div v-else class='number'>{{item}}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SplitNumber',
  props: ['numValue'],
  data () {
    return {
      valArr:[]
    }
  },
  methods: {
  },
  mounted() {
     this.$nextTick(function() {
       let str = parseInt(this.numValue).toLocaleString();
       this.valArr = str.split('');
       console.info(this.valArr);
     })
  },
  watch: {
    numValue:{
      handler(curVal,oldVal){
        this.$nextTick(function() {
          let str = parseInt(curVal).toLocaleString();
          this.valArr = str.split('');
          console.info(this.valArr);
        })
  　　 }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.price-div {
  font: 12px tahoma, Arial, Verdana, sans-serif;
  display:inline-flex;
  text-align:center;
}
.price-div .number {
  background: dimgrey;
  width: 26px;
  height: 40px;
  line-height: 40px;
  font-size: 32px;
  font-weight: bold;
  overflow: hidden;
  margin-right: 1px;
  color: yellow;
}
.price-div .sign {
  font-size: 30px;
  font-weight: bold;
  line-height: 40px;
  margin-right: 1px;
  height: 30px;
  color: yellow;
}
</style>
