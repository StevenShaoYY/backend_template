<template>
  <div :class="className" :style="{height:remHeight,width:remWidth}"/>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce, getScale, getSPx } from '@/utils/index.js'

const animationDuration = 6000

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100'
    },
    height: {
      type: String,
      default: '100'
    },
    data: {
      default: ()=> {
        return [
            [
                ['大专及以上','高中','初中'],
                [22,66,12]
            ],
            [
                ['0~2年','3~5年','5年以上'],
                [63,23,14]
            ]
        ]
      },
      type: Array
    }
  },
  data() {
    return {
      chart: null,
      subject: [],
      value: [],
      remWidth:'',
      remHeight: '',
      scale: 1
    }
  },
  created() {
    this.scale = getSPx()
    this.remWidth = this.width + '%'
    this.remHeight = this.height + '%'
  },
  mounted() {
    this.initChart()
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
          this.scale = getSPx()
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHandler)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      let data = this.data;
      let ser1 = []
      let ser2 = []
      for(let i= 0;i<data[0][0].length;i++) {
        ser1.push({
          value: data[0][1][i], 
          name: data[0][0][i],
          label: {
            normal: {
              show: true,
              position: 'inside',
              formatter: function(params){
                return  [`{a|${params.data.name}}`]
              },
              rich: {
                a:{
                  color: '#ffffff',
                  fontSize: 15*this.scale,
                  padding:[0,0,0,0]
                }
              }
            },
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          emphasis: {
            label:{
              show: true,
              fontWeight: 'bold'
            }
          }
        })
      }
      for(let i= 0;i<data[0][0].length;i++) {
        ser2.push({
          value: data[1][1][i], 
          name: data[1][0][i],
          label: {
            normal: {
              show: true,
              position: 'outside',
              formatter: function(params){
                return  [`{a|${params.data.name}}`]
              },
              rich: {
                a:{
                  color: '#ffffff',
                  fontSize: 15*this.scale,
                  padding:[0,0,0,0]
                }
              }
            },
          },
          labelLine: {
            normal: {
              show: true
            }
          },
          emphasis: {
            label:{
              show: true,
              fontWeight: 'bold'
            }
          }
        })
      }
      this.chart.setOption({
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        color:['#B61A1A','#FFB23c','#27BFAA','#69E2F8','#4188FF'],
        series : [
          {
            name: '学历',
            type: 'pie',
            startAngle:0,
            radius : ['0','40%'],
            center: ['50%', '50%'],
            data:ser1,
            itemStyle: {
            }
          },
          {
            name: '工作经验',
            type: 'pie',
            startAngle:0,
            radius : ['44%','70%'],
            center: ['50%', '50%'],
            data:ser2,
            itemStyle: {
            }
          },
          {
            type: 'pie',
            silent: true,
            radius: ['70%','92%'],
            label: {
              normal: {
                show: false
              }
            },
            color: ['#558BFF'],
            center:['50%', '50%'],
            data: [{
              value: 1,
              itemStyle: {
                normal: {
                  // color: '#237dff',
                  // opacity: 0.1,
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 1,
                    x2: 0,
                    y2: 0,
                    colorStops: [{
                      offset: 0, 
                      color: 'rgba(35,125,255,0.1)' // 0% 处的颜色
                    }, {
                      offset: 1, 
                      color: 'rgba(35,125,255,0.02)'
                    }]
                  },
                },
              }
            }],
            animationType: 'scale'
          }
        ],
        backgroundColor: 'rgba(0,0,0,0)'
      })
    }
  }
}
</script>
