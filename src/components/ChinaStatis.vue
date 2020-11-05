<template>
	<div class="hello">
		<!-- 初始化echarts 需要个有宽高的盒子 -->
		<div class="left">
			<!-- <china-left :countryStatisdata="dataList"></china-left> -->
			<china-left></china-left>
		</div>
		<div class="center">
			<el-card shadow="hover" class="card-box">
			<el-menu :default-active="activeIndex" mode="horizontal">
			<el-menu-item index="1" @click="select()">
				累计确诊人数
			</el-menu-item>
			<el-menu-item index="2" @click="select1()">
				现有确诊人数
			</el-menu-item>
			<el-menu-item index="4" @click="select3()">
				疫情数据展示
			</el-menu-item>
			<el-menu-item index="3" @click="select2()">
				新冠肺炎预防须知
			</el-menu-item>
			
		</el-menu>
			<div ref="mapbox" class="box" v-show="active==1">
			</div>
			<div ref="mapbox1" class="box1" v-show="active==2">
    	</div>
			<div ref="mapbox2" class="box2" v-show="active==3">
				<china-help></china-help>
    	</div>
			<div ref="mapbox3" class="box3" v-show="active==4">
				<china-echarts></china-echarts>
    	</div>
		</el-card>
		</div>
		<div class="right">
			<h2>疫情最新进展</h2>
			<china-news></china-news>
		</div>
	</div>
</template>

<script>
	import echarts from 'echarts'
	import 'echarts/map/js/china.js'
	import jsonp from 'jsonp'
	import ChinaLeft from './ChinaLeft'
	import ChinaNews from './ChinaNews.vue'
	import ChinaHelp from './ChinaHelp.vue'
	import ChinaEcharts from './ChinaEcharts.vue'
  const option1 = {
		title: {
			text: '全国现有确诊人数疫情地图'
		},
		series: [
			{
			name:'现有确诊人数',
			type: 'map', //告诉echarts 渲染地图
			map: 'china',
			label: {
				show: true, //显示各个省份名称
				fontSize: 8,
			},
			itemStyle: {
				areaColor: '#f0f0f0' //区域的背景颜色
			},
			emphasis: {
				//控制鼠标滑过时的高亮样式
				itemStyle: {
					areaColor: '#c7fffd'
				}
			},
			zoom: 1.2, //控制地图的大小
		}],
		visualMap: [{
			type: 'piecewise',
			show: true,
			splitNumber: 6,
			pieces: [{
					min: 10000
				}, // 不指定 max，表示 max 为无限大（Infinity）。
				{
					min: 1000,
					max: 9999
				},
				{
					min: 100,
					max: 999
				},
				{
					min: 10,
					max: 99
				},
				{
					min: 1,
					max: 9
				},
				{
					min: 0,
					max: 0
				}
			],
			//align:'right' // 默认是left
			inRange: {
				symbol: 'rect',
				color: ['#fff', '#ffaa85', '#ff7b69', '#cc2929', '#8c0d0d', '#660208']
			},
			itemHeight: 10,
			itemWidth: 20
		}],
		tooltip:{
			show:true
		}
	};
	const option = {
		title: {
			text: '全国累计确诊人数疫情地图'
		},
		series: [
			{
			name:'累计确诊总人数',
			type: 'map', //告诉echarts 渲染地图
			map: 'china',
			label: {
				show: true, //显示各个省份名称
				fontSize: 8,
			},
			itemStyle: {
				areaColor: '#f0f0f0' //区域的背景颜色
			},
			emphasis: {
				//控制鼠标滑过时的高亮样式
				itemStyle: {
					areaColor: '#c7fffd'
				}
			},
			zoom: 1.2, //控制地图的大小
		}],
		visualMap: [{
			type: 'piecewise',
			show: true,
			splitNumber: 6,
			pieces: [{
					min: 10000
				}, // 不指定 max，表示 max 为无限大（Infinity）。
				{
					min: 1000,
					max: 9999
				},
				{
					min: 100,
					max: 999
				},
				{
					min: 10,
					max: 99
				},
				{
					min: 1,
					max: 9
				},
				{
					min: 0,
					max: 0
				}
			],
			//align:'right' // 默认是left
			inRange: {
				symbol: 'rect',
				color: ['#fff', '#ffaa85', '#ff7b69', '#cc2929', '#8c0d0d', '#660208']
			},
			itemHeight: 10,
			itemWidth: 20
		}],
		tooltip:{
			show:true
		}
	};
	export default {
		name: 'Map',
		data() {
			return {
				activeIndex: '1',
				active:1,
				dataList:null
			}
		},
		components:{
			ChinaLeft,
			ChinaNews,
			ChinaHelp,
			ChinaEcharts
		},
		mounted() {
      this.getData();
      this.getData1();
			this.mychart = echarts.init(this.$refs.mapbox); //获取mapbox盒子
      this.mychart1 = echarts.init(this.$refs.mapbox1);
      this.mychart.setOption(option);
      this.mychart1.setOption(option1);
		},
		methods: {
			select(){
				this.active = 1
			},
			select1(){
				this.active = 2
			},
			select2(){
				this.active = 3
			},
			select3(){
				this.active = 4
			},
			getData() {
				jsonp(
					'http://interface.sina.cn/news/wap/fymap2020_data.d.json?_=1580892522427', {}, (erros, data) => {
						var lists = data.data.list.map(item => {
							return {
								name: item.name,
								value: item.value
							}
						})
						option.series[0].data = lists;
						this.mychart.setOption(option);
					})
      },
      getData1() {
				jsonp(
					'http://interface.sina.cn/news/wap/fymap2020_data.d.json?_=1580892522427', {}, (erros, data) => {
						// this.dataList = data.data
						var lists1 = data.data.list.map(item => {
							return {
								name: item.name,
								value: item.econNum
							}
						})
						option1.series[0].data = lists1;
						this.mychart1.setOption(option1);
					})
			}
		}
	}
</script>

<style scoped>
.hello{
	height: 100%;
	width: 80%;
	display: flex;
}
.left{
	flex: 0 0 30%;
}
.center{
	margin-top: 12px;
	flex: 0 0 40%;
}
.right{
	height: 100%;
	flex: 0 0 30%;
}
.card-box{
	height: 650px;
	width: 750px;
	margin: auto;
	}
.box,.box1{
	width: 650px;
	height: 550px;
	margin: 20px auto;
}
</style>
