<template>
  <div id="echarts">
      <div id="bar1"></div>
  </div>
</template>

<script>
import axios from 'axios'
let dates = []
let confirms = []
let heals = []
let deads = []
export default {
  data() {
    return {
      DataList:''
    }
  },
  created(){
    getData:{
      const that = this
      axios.get('bpi/modules/list?modules=chinaDayList',{}).then((data)=>{
        this.DataList = data.data.data.chinaDayList
        for(let key in this.DataList){
          dates.push(this.DataList[key].date)
          confirms.push(this.DataList[key].confirm)
          heals.push(this.DataList[key].heal)
          deads.push(this.DataList[key].dead)
        }
        that.bar(dates,confirms,heals,deads)
        // console.log(dates);
      }).catch(function(error) {
          console.log(error);
        });
    } 
  },
  mounted(){
    
  },
  methods:{
    bar(dates,confirms,heals,deads){ 
      var echarts = require("echarts");
      var myChart1 = echarts.init(document.getElementById("bar1"));
      myChart1.setOption({
        title: {
          text: '疫情每日新增数据',
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {
          data: ["累计确诊", "累计病死", "累计治愈"]
        },
        toolbox: {
          show: true,
          feature: {
            magicType: { show: true, type: ["stack", "tiled"] },
            saveAsImage: { show: true }
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: dates,
          
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "累计确诊",
            type: "line",
            smooth: true,
            stack: "确诊",
            itemStyle: {
              normal: {
              }
            },
            data: confirms
          },
          {
            name: "累计病死",
            type: "line",
            smooth: true,
            stack: "死亡",
            itemStyle: {
              normal: {
                // areaStyle: {
                //   type: "default",
                //   opacity: 0.1
                // }
              }
            },
            data: deads
          },
          {
            name: "累计治愈",
            type: "line",
            smooth: true,
            stack: "治愈",
            itemStyle: {
              normal: {
                // areaStyle: {
                //   type: "default",
                //   opacity: 0.1
                // }
              }
            },
            data: heals
          }
        ]
      });
    }
  }
}
</script>

<style scoped>
#bar1{
  height: 250px;
  width: 600px;
}
</style>