<template>
  <div id="country">
    <div class="content">
      <div id="countrydata">
        <div class="countryName">
          <p>国家/地区</p>
          <p>
            <strong>中国</strong>
          </p>
          <p>{{TodayData.date}}</p>
        </div>
        <div class="nowconfirm">
          <p>较上日增加：{{TodayData.nowConfirm-YesData.nowConfirm}}</p>
          <p>
            <strong>{{TodayData.nowConfirm}}</strong>
          </p>
          <p>现有确诊</p>
        </div>
        <div class="confirm">
          <p>较上日增加：{{TodayData.confirm-YesData.confirm}}</p>
          <p>
            <strong>{{TodayData.confirm}}</strong>
          </p>
          <p>累计确诊</p>
        </div>
        <div class="heal">
          <p>较上日增加：{{TodayData.heal - YesData.heal}}</p>
          <p>
            <strong>{{TodayData.heal}}</strong>
          </p>
          <p>累计治愈</p>
        </div>
        <div class="importedCase">
          <p>较上日增加：{{TodayData.importedCase-YesData.importedCase}}</p>
          <p>
            <strong>{{TodayData.importedCase}}</strong>
          </p>
          <p>境外输入</p>
        </div>
        <div class="noInfect">
          <p>较上日增加：{{TodayData.noInfect-YesData.noInfect}}</p>
          <p>
            <strong>{{TodayData.noInfect}}</strong>
          </p>
          <p>无症状感染者</p>
        </div>
        <div class="dead">
          <p>较上日增加：{{TodayData.dead-YesData.dead}}</p>
          <p>
            <strong>{{TodayData.dead}}</strong>
          </p>
          <p>累计病死</p>
        </div>
        
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios'
import {EventBus} from '../plugins/bus'
export default {
  data() {
    return {
      TodayData : '',
      YesData: ''
    }
  },

  // props:['countryStatisdata'],
  // watch:{
  //   countryStatisdata(val){
  //     this.chinaStatisdata = val
  //     console.log(this.chinaStatisdata);
  //   }
  mounted(){
    this.getData()
  },
  methods:{
    getData(){
      axios.get('bpi/modules/list?modules=chinaDayList',{})
      .then((data)=>{
        this.DataList = data.data.data.chinaDayList
        let len = this.DataList.length
        this.TodayData  = this.DataList[len-1]
        this.YesData = this.DataList[len-2]
      })
      .then(()=>{
        EventBus.$emit('healRate',this.TodayData)
      })
    },
  }
}
</script>

<style scoped>
  #country {
  height: calc(100vh - 90px);
  /* background-color: rgb(187, 136, 136); */
  padding: 10px 0;
}
.content {
  /* background-color: lightskyblue; */
  margin: 0 5%;
  width: 90%;
  height: 100%;
  display: flex;
}
#countrydata {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.countryName {
  width: 80%;
  /* margin: 0 10%; */
  height: 88px;
  background-color: rgb(170, 190, 228);
  border-radius: 20px 20px 0 0;
}
.importedCase{
  width: 80%;
  margin: 0 10%;
  height: 88px;
  background-color: rgb(218, 218, 218);
}
.noInfect{
  width: 80%;
  margin: 0 10%;
  height: 88px;
  background-color: rgb(202, 63, 129);
}
.nowconfirm {
  width: 80%;
  margin: 0 10%;
  height: 88px;
  background-color: rgb(242, 58, 59);
}
.confirm {
  width: 80%;
  margin: 0 10%;
  height: 88px;
  background-color: rgb(204, 30, 30);
}
.dead {
  width: 80%;
  margin: 0 10%;
  height: 88px;
  background-color: rgb(78, 90, 101);
  border-radius: 0 0 20px 20px;
}
.heal {
  width: 80%;
  margin: 0 10%;
  height: 88px;
  background-color: rgb(201, 231, 201);
}
p {
  line-height: 15px;
  /* margin: 14px; */
  padding: 0;
  color: black;
  font-size: 12px;
}
p strong {
  color: black;
  font-size: 20px;
}
#echarts {
  display: inline-block;
  width: 70%;
  height: 100%;
}
#bar1 {
  width: 100%;
  /* background-color: palevioletred; */
  height: calc(calc(100vh - 90px) / 2);
}
#bar2 {
  width: 100%;
  /* background-color: rebeccapurple; */
  height: calc(calc(100vh - 90px) / 2);
}
</style>