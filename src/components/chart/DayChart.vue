<template>
  <div class="chart-content">
    <div id='myDayChart'>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/dark');

export default {
  name: 'test',
  data () {
    return {
      msg: 'this is a Day Chart',
      chart: null,
      seriesData: [{    // For shadow
         type: 'bar',
         itemStyle: {
             normal: {
                color: 'rgba(255,255,255,0.15)',
                barBorderRadius:[0, 5, 5, 0]
             }
         },
         barGap:'-100%', // 两个柱子重叠
         barCategoryGap:'80%', // 柱子之间的间距
         data: [140, 140, 140, 140],
         animation: false
      },
      {
          type:'bar',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient( // 0,0,0,1表示从上到下渐变 0,0,1,0// 从左到右渐变
                  0, 0, 0, 1,
                  [
                    {offset: 0.9, color: '#188df0'},
                    {offset: 0, color: '#83baf3'}
                  ]
              ),
              barBorderRadius:[0, 5, 5, 0]
            }
          },
          // yAxisIndex: 0,
          data:[100, 90, 80, 70]
      },
      {
          name:'日均线',
          type:'line',
          itemStyle: {
            normal: {
              color: '#FFA500'
            }
          },
          data:[80, 80, 90, 80]
      }],
      yAxisData: ['更新道路342公里','新增道路23公里','更新PIO3342个','新增POI100个']
    }
  },
  methods: {
    // 获取背景柱状图数组
    shadowMax() {
      var max = 0;
      var maxArr = [];
      for (let i = 0; i < this.seriesData[1].data.length; i++) {
        if (max < this.seriesData[1].data[i]) {
          max = this.seriesData[1].data[i]
        }
      }
      max = Math.ceil(max) + 10;
      this.seriesData.forEach(function (item, index, arr) {
        maxArr[index] = max;
      });
      return maxArr;
    },
    // 绘制表格
    drawGraph() {
        this.chart = echarts.init(document.getElementById('myDayChart'), 'dark')
        // let dataShadow = this.shadowMax();
        this.chart.showLoading()
        this.chart.setOption({
            grid: {
              left: 120,
              right: 20,
              top: 5,
              bottom: 15
            },
            legend: {
                itemWidth: 14,
                bottom: 0,
                right: 80,
                data:[{ name:'日均线', icon: 'roundRect'}]
            },
            xAxis: {
              show: false
            },
            yAxis: {
                data: this.yAxisData,
                boundaryGap: true, // 坐标轴两边留空白
                axisLine: {
                  show:true
                },
                axisTick: {
                  show: false
                },
                axisLabel: {
                  fontSize: 14,
                  fontWeight: 'bold'
                }
            },
            series: this.seriesData
        })
        this.chart.hideLoading()
    }
  },
  mounted() {
      // this.$nextTick(function() {
          this.drawGraph()
      // })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chart-content{
    float: left;
    background-color: #000;
    color: #FFF;
    width: 400px;
    display: inline-block;
}
#myDayChart {
    width: 400px;
    height: 200px;
}
</style>
