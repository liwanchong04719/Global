<template>
  <div class="chart-content">
    <div id='myLineChart'>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
// require('echarts/theme/dark');

export default {
  name: 'test',
  props: ['chartData'],
  data () {
    return {
      chart: null,
      // xAxisData: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
    }
  },
  methods: {
    // 绘制表格
    drawGraph() {
        if (!this.chart) {
          this.chart = echarts.init(document.getElementById('myLineChart'))
        }
        this.chart.showLoading()
        let legendData = [{ name:`情报量${this.chartData.inforTotal}个`, icon: 'roundRect'},
          { name:`用户问题反馈${this.chartData.userTotal}个`, icon: 'roundRect'},
          { name:`互联网信息${this.chartData.webTotal}个`, icon: 'roundRect'}
        ];
        let seriesData = [{
            name:`情报量${this.chartData.inforTotal}个`,
            type:'line',
            symbol:'none',  // 去掉点
            smooth: true,
            itemStyle: {
              normal: {
                color: '#FF9933'
              }
            },
            data: this.chartData.lineData[0]// [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90]
        },
        {
            name:`用户问题反馈${this.chartData.userTotal}个`,
            type:'line',
            symbol:'none',
            smooth: true,
            itemStyle: {
              normal: {
                color: '#3399FF'
              }
            },
            data: this.chartData.lineData[1]// [120, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290]
        },
        {
            name:`互联网信息${this.chartData.webTotal}个`,
            type:'line',
            symbol:'none',
            smooth: true,
            itemStyle: {
              normal: {
                color: '#3333FF'
              }
            },
            data: this.chartData.lineData[2] //[120, 232, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190]
        }]

        this.chart.setOption({
            backgroundColor: 'rgba(128, 128, 128, 0)',
            grid: {
              left: 20,
              right: 20,
              top: 14,
              bottom:24
            },
            title: {
              text: '累积值',
              left:20,
              top: 20,
              textStyle: {
                color: '#FFFFFF'
              }
            },
            legend: {
                orient: 'vertical',
                right: 10,
                top: 10,
                itemWidth: 14,
                data: legendData,
                textStyle: {color: '#FFFFFF'}
            },
            xAxis: {
                data: this.chartData.xAxis,
                boundaryGap: false, // 坐标轴两边不留空白
                axisLine: {
                  show:false
                },
                axisTick: {
                  show: false
                },
                axisLabel: {
                  color: '#FFFFFF',
                  interval: 0 // 强制显示
                }
            },
            yAxis: {
                show: false
            },
            series: seriesData
        })
        this.chart.hideLoading()
    }
  },
  mounted() {
  },
  watch: {
    chartData: {
      handler(curVal,oldVal){
        this.$nextTick(function() {
          this.drawGraph()
        })
　　　　},
　　　　deep:true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chart-content{
    color: #FFF;
    width: 400px;
    display: inline-block;
}
#myLineChart {
    width: 400px;
    height: 140px;
}
</style>
