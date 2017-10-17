<template>
  <div class="chart-content">
    <div style='display:flex;text-align:center'>
      <div style='flex:1'>
        <div>道路更新累积值</div>
        <div>道路新增累积值</div>
      </div>
      <div style='flex:1; text-align:left;'>
        <div><span class='numberText'>{{roadData.cUpdateRoad | splitSymbol}}</span> 公里</div>
        <div><span class='numberText'>{{roadData.cAddRoad | splitSymbol}}</span> 公里</div>
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
      return parseFloat(value).toLocaleString();
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
              left: 50,
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
                  color: '#DDDDDD',
                  interval: 0 // 强制显示
                }
            },
            yAxis: {
                show: true,
                axisLabel: {
                  fontSize: 12,
                  color: '#DDDDDD',
                  formatter: function (value, index) {
                    let val = value / 10000;
                    if (val == 0) {
                      return val;
                    }
                    return value / 10000 + 'W';
                  }
                },
                splitLine: {
                  show:false
                },
                splitNumber: 4
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
    color: #DDD;
    width: 400px;
    display: inline-block;
}
#myBarRoadChart {
    width: 400px;
    height: 140px;
}
.numberText{
  color: #FD8E20;
}
</style>
