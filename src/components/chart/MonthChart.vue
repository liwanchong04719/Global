<template>
  <div class="chart-content">
    <div class='chartTitle'>月出品</div>
    <div id='myChartRoad'>
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
      msg: 'this is a Month Chart',
      chart: null,
      seriesData: [{    // For shadow
         type: 'bar',
         itemStyle: {
             normal: {
                color: 'rgba(255,255,255,0.15)',
                barBorderRadius:[5, 5, 0, 0]
             }
         },
         barGap:'-100%', // 两个柱子重叠
         barCategoryGap:'80%', // 柱子之间的间距
         // yAxisIndex: 0,
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
              barBorderRadius:[5, 5, 0, 0]
            }
          },
          data:[100, 90, 80, 70]
      },
      {
          name:'月均线',
          type:'line',
          symbol:'none',  // 去掉点
          smooth: true,
          itemStyle: {
            normal: {
              color: '#FFA500'
            }
          },
          data:[80, 40, 60, 50]
      }],
      yAxisData: ['更新道路200公里','新增道路30公里','更新PIO4230个','新增POI920个']
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
        this.chart = echarts.init(document.getElementById('myChartRoad'))
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
                data:[{ name:'月均线', icon: 'roundRect', textStyle: {color: '#FFFFFF'}}]
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
                  fontWeight: 'bold',
                  color: '#FFFFFF'
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
#myChartRoad {
    width: 400px;
    height: 200px;
}
</style>
