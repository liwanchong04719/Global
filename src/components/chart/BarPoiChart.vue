<template>
  <div class="chart-content">
    <div style='display:flex;text-align:center'>
      <div style='width: 50px;'>POI</div>
      <div style='flex:1'>
        <div>更新积累值</div>
        <div>{{poiData.cUpdatePoi}}个</div>
      </div>
      <div style='flex:1'>
        <div>新增积累值</div>
        <div>{{poiData.cAddPoi}}个</div>
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
  methods: {
    // 获取背景柱状图数组
    shadowMax(seriesData) {
      var max = 0;
      var maxArr = [];
      for (let i = 0; i < seriesData.length; i++) {
        if (max < seriesData[i]) {
          max = seriesData[i]
        }
      }
      max = Math.ceil(max) + 10;
      seriesData.forEach(function (item, index, arr) {
        maxArr[index] = max;
      });
      return maxArr;
    },
    // 绘制表格
    drawGraph() {
        // let seriesDataTemp = this.poiData.seriesNewData
        // let dataShadow = this.shadowMax(seriesDataTemp)
        let xAxis = this.poiData.xAxis
        if (!this.chart) {
            this.chart = echarts.init(document.getElementById('myBarPoiChart'))
        }

        this.chart.showLoading()
        this.chart.setOption({
            backgroundColor: 'rgba(128, 128, 128, 0)',
            grid: {
              left: 20,
              right: 20,
              top: 0,
              bottom:30
            },
            xAxis: {
                data: xAxis,
                boundaryGap: false, // 坐标轴两边不留空白
                axisLine: {
                  show:false
                },
                axisTick: {
                  show: false
                },
                axisLabel: {
                  fontSize: 12,
                  color: '#FFFFFF',
                  interval: 0
                }
            },
            yAxis: {
                show: false
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
                 data: this.poiData.updateData,
                 animation: false
             },{
                type: 'bar',
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient( // 0,0,0,1表示从上到下渐变 0,0,1,0// 从左到右渐变
                        0, 0, 0, 1,
                        [
                          {offset: 0.9, color: '#188df0'},
                          {offset: 0, color: '#83baf3'}
                        ]
                    ),
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
    color: #FFF;
    width: 400px;
    display: inline-block;
}
#myBarPoiChart {
    width: 400px;
    height: 150px;
}
</style>
