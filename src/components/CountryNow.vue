<template>
	<div class="hello">
		<!-- 初始化echarts 需要个有宽高的盒子 -->
		<div ref="mapbox" class="box">
		</div>
    <div ref="mapbox1" class="box1">
    </div>
	</div>
</template>

<script>
	import echarts from 'echarts'
	import 'echarts/map/js/china.js'
	import jsonp from 'jsonp'
  // import axios from "axios";
  const option1 = {
		title: {
			text: '疫情地图'
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
	const option = {
		title: {
			text: '疫情地图'
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
		mounted() {
      this.getData();
      this.getData1();
			this.mychart = echarts.init(this.$refs.mapbox); //获取mapbox盒子
      this.mychart1 = echarts.init(this.$refs.mapbox1);
      this.mychart.setOption(option);
      this.mychart1.setOption(option1);
		},
		methods: {
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
						var lists1 = data.data.list.map(item => {
							return {
								name: item.name,
								value: item.econNum
							}
            })
            console.log(lists1);
						option1.series[0].data = lists1;
						this.mychart.setOption(option1);
					})
			}
		}
	}
</script>

<style scoped>
	.box,.box1{
		width: 750px;
		height: 650px;
		margin: auto;
	}
</style>
