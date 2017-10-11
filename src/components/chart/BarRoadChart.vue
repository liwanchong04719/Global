<template>
  <div class="chart-content">
    <div style='display:flex;text-align:center'>
      <div style='width: 50px;'>道路</div>
      <div style='flex:1'>
        <div>更新积累值</div>
        <div>{{roadData.cUpdateRoad | splitSymbol}}公里</div>
      </div>
      <div style='flex:1'>
        <div>新增积累值</div>
        <div>{{roadData.cAddRoad | splitSymbol}}公里</div>
      </div>
    </div>
    <div id='myBarRoadChart'>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
// require('echarts/theme/dark');

export default {
  name: 'test',
  props: ['roadData'],
  data () {
    return {
      msg: 'this is a bar Chart',
      chart: null,
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
      for (let i = 0; i < this.roadData.updateData.length; i++) {
        if (max < this.roadData.newData[i] + this.roadData.updateData[i]) {
          max = this.roadData.newData[i] + this.roadData.updateData[i]
        }
      }
      max = Math.ceil(max) + 20;
      this.roadData.newData.forEach(function (item, index, arr) {
        maxArr[index] = max;
      });
      return maxArr;
    },
    // 绘制表格
    drawGraph() {
        let dataShadow = this.shadowMax();
        if (!this.chart) {
            this.chart = echarts.init(document.getElementById('myBarRoadChart'))
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
                data: this.roadData.xAxis,
                axisLine: {
                  show:false
                },
                axisTick: {
                  show: false
                },
                axisLabel: {
                  fontSize: 12,
                  color: '#FFFFFF',
                  interval: 0 // 强制显示
                }
            },
            yAxis: {
                show: true,
                axisLabel: {
                  fontSize: 12,
                  color: '#FFFFFF',
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
                 data: dataShadow,
                 animation: false
             },{
              type: 'bar',
              stack: '总和',
              itemStyle: {
                normal: {
                  color: '#3333FF',
                  barBorderRadius:[5, 5, 0, 0]
                }
              },
              data: this.roadData.newData
            },{
               type: 'bar',
               stack: '总和',
               itemStyle: {
                 normal: {
                   color: '#3399FF',
                   barBorderRadius:[5, 5, 0, 0]
                 }
               },
               data: this.roadData.updateData
            }]
        })
        this.chart.hideLoading()
    }
  },
  updated() {
  },
  watch: {
    roadData: {
      handler(curVal,oldVal){
        this.$nextTick(function() {
          this.drawGraph()
        })
　　　　},
　　　　deep:true //当单观察数据roadData为对象时,需要添加deep:true参数，否则监听不到方法
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
#myBarRoadChart {
    width: 400px;
    height: 140px;
}
</style>
