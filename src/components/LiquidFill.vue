<template>
    <div class="box">
      <ve-liquidfill :data="chartData" height="150px" width="150px" :settings="chartSettings" />
      <div class="title"><h4>治愈率</h4></div>
    </div>

</template>

<script>
function getColor(value) {
  return value > 0 && value <= 0.5
    ? "rgba(241,47,28,.7)"
    : value > 0.5 && value <= 0.8
    ? "rgba(204,178,26,.7)"
    : value > 0.8
    ? "rgba(97,216,0,.7)"
    : "#c7c7cb";
}
import {EventBus} from '../plugins/bus'
export default {
  data() {
    return {
      chartData:null,
      chartSettings:null,
      healRate : null
    }; 
  },
  watch:{
    healRate:{
      handler(){
          this.chartData =  {
          columns: ["title", "percent"],
          rows: [
            {
              title: "用户月同比增长",
              // percent: this.userGrowthLastMonth / 100
              percent: parseFloat(this.healRate/100),
            },
          ],
        },
      this.chartSettings = {
        seriesMap: {
          用户月同比增长: {
            radius: "80%",
            label: {
              formatter: (v) => {
                console.log(v);
                return `${(v.data.value * 100).toFixed(2)}%`;
              },
              textStyle: {
                fontSize: 24,
                color: "#999",
                fontWeight: "normal",
              },
              position: ["50%", "50%"],
              insideColor: "#fff",
            },
            outline: {
              itemStyle: {
                borderColor: "#aaa4a4",
                borderWidth: 1,
                color: "none",
                shadowBlur: 0,
                shadowColor: "#fff",
              },
              borderDistance: 0,
            },
            backgroundStyle: {
              color: "#fff",
            },
            itemStyle: {
              shadowBlur: 0,
              shadowColor: "#fff",
            },
            amplitude: 8,
            color: [getColor(this.chartData.rows[0].percent)],
          },
        },
      
      }
    }
  }
  },
  mounted(){
    EventBus.$on('healRate',(data)=>{
      this.healRate = data.healRate
      console.log(this.healRate);
    })  
  },
  methods:{
        
    }
};
</script>

<style scoped>
.box{
  display: flex;
  
}
.title{
  padding: 50px 0;
  flex:0 0 20%
}
h4{
  writing-mode:vertical-rl;
  
}
</style>
