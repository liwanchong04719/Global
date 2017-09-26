<template>
  <div class="chart-content">
    <div class='chartTitle'>第三方数据</div>
    <div id='myLineChart'>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
// require('echarts/theme/dark');

export default {
  name: 'test',
  data () {
    return {
      chart: null,
      legendData: [{ name:'用户轨迹点10250个', icon: 'roundRect'},
        { name:'用户问题反馈220个', icon: 'roundRect'},
        { name:'互联网信息4250个', icon: 'roundRect'}
      ],
      seriesData: [{
          name:'用户轨迹点10250个',
          type:'line',
          symbol:'none',  // 去掉点
          smooth: true,
          data:[120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90]
      },
      {
          name:'用户问题反馈220个',
          type:'line',
          symbol:'none',
          smooth: true,
          data:[220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290]
      },
      {
          name:'互联网信息4250个',
          type:'line',
          symbol:'none',
          smooth: true,
          data:[150, 232, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190]
      }],
      xAxisData: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
    }
  },
  methods: {
    // 获取背景柱状图数组
    shadowMax() {
      var max = 0;
      var maxArr = [];
      for (let i = 0; i < this.seriesData.length; i++) {
        if (max < this.seriesData[i]) {
          max = this.seriesData[i]
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
        this.chart = echarts.init(document.getElementById('myLineChart'))
        let dataShadow = this.shadowMax();
        this.chart.showLoading()
        this.chart.setOption({
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
                data: this.legendData,
                textStyle: {color: '#FFFFFF'}
            },
            xAxis: {
                data: this.xAxisData,
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
            series: this.seriesData
        })
        this.chart.hideLoading()
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.drawGraph()
    })
  },
  //watch: {
    //dayProduce: function () {
      //this.$nextTick(function() {
        //  this.drawGraph()
      //})
    //}
  //}
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
#myLineChart {
    width: 400px;
    height: 200px;
}
</style>
