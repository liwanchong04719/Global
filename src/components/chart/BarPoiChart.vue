<template>
  <div class="chart-content">
    <div style='display:flex;text-align:center'>
      <div style='width: 50px;'>POI</div>
      <div style='flex:1'>
        <div>更新积累值</div>
        <div>{{poiData.cUpdatePoi | splitSymbol}}个</div>
      </div>
      <div style='flex:1'>
        <div>新增积累值</div>
        <div>{{poiData.cAddPoi | splitSymbol}}个</div>
      </div>
    </div>
    <div id='myBarPoiChart'>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
// require('echarts/theme/dark');

export default {
  props: ['poiData'],
  data () {
    return {
      msg: 'this is a bar Chart',
      chart: null
    }
  },
  filters: {
    splitSymbol: function (value){ // 将数字三位隔开
      return parseInt(value).toLocaleString();
    }
  },
  methods: {
    // 获取背景柱状图数组
    shadowMax() {
      var max = 0;
      var maxArr = [];
      for (let i = 0; i < this.poiData.updateData.length; i++) {
        if (max < this.poiData.newData[i] + this.poiData.updateData[i]) {
          max = this.poiData.newData[i] + this.poiData.updateData[i]
        }
      }
      max = Math.ceil(max) + 20;
      this.poiData.newData.forEach(function (item, index, arr) {
        maxArr[index] = max;
      });
      return maxArr;
    },
    // 绘制表格
    drawGraph() {
        // let seriesDataTemp = this.poiData.seriesNewData
        let dataShadow = this.shadowMax()
        let xAxis = this.poiData.xAxis
        if (!this.chart) {
            this.chart = echarts.init(document.getElementById('myBarPoiChart'))
        }

        this.chart.showLoading()
        this.chart.setOption({
            backgroundColor: 'rgba(128, 128, 128, 0)',
            grid: {
              left: 70,
              right: 20,
              top: 10,
              bottom:30
            },
            xAxis: {
                data: xAxis,
                boundaryGap: true, // 坐标轴两边留空白
                axisLine: {
                  show:false
                },
                axisTick: {
                  show: false
                },
                axisLabel: {
                  fontSize: 12,
                  color: '#DDDDDD',
                  interval: 0
                }
            },
            yAxis: {
                show: true,
                axisLabel: {
                  fontSize: 12,
                  color: '#DDDDDD',
                },
                splitLine: {
                  show:false
                },
            },
            calculable: true,
            series: [{    // For shadow
                 type: 'bar',
                 itemStyle: {
                     normal: {
                        color: 'rgba(255,255,255,0.15)',
                        barBorderRadius:[5, 5, 0, 0]
                     }
                 },
                 barGap:'-100%', // 两个柱子重叠
                 barCategoryGap:'80%', // 柱子之间的间距
                 data: dataShadow, //this.poiData.updateData,
                 animation: false
             },{
                type: 'bar',
                stack: '总和',
                itemStyle: {
                  normal: {
                     color: '#3399FF',
                     barBorderRadius:[5, 5, 0, 0]
                   }
                },
                data: this.poiData.updateData
            },{
               type: 'bar',
               stack: '总和',
               itemStyle: {
                 normal: {
                   color: '#3333FF',
                   barBorderRadius:[5, 5, 0, 0]
                 }
               },
               data: this.poiData.newData
            }]
        })
        this.chart.hideLoading()
    }
  },
  updated() {
  },
  watch: {
    poiData: {
      handler(curVal,oldVal){
        this.$nextTick(function() {
          this.drawGraph()
        })
　　　　},
　　　　deep:true //当单观察数据poiData为对象时,需要添加deep:true参数，否则监听不到方法
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chart-content{
    color: #DDD;
    width: 400px;
    display: inline-block;
}
#myBarPoiChart {
    width: 400px;
    height: 140px;
}
</style>
