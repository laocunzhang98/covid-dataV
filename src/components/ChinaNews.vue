<template>
  <div class="infinite-list-wrapper" style="overflow:auto">
    <ul
      class="list"
      v-infinite-scroll="load"
      infinite-scroll-disabled="disabled">
      <el-timeline>
        <li v-for="(news,count) in newsList" class="list-item">
          <el-timeline-item :timestamp="news.publish_time" placement="top" color="red">
            <span class="znews"></span>
            <el-card>
              <h4>{{news.title}}</h4>
              <p><a :href=news.url target="_blank">{{news.desc}}</a></p>
            </el-card>
          </el-timeline-item>
        </li>
      </el-timeline>
    </ul>
    <p v-if="loading">加载中...</p>
    <p v-if="noMore">没有更多了</p>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      newsList : null,
      count : 10,
      loading: false
    }
  },
  computed: {
      noMore () {
        return this.count >= 20
      },
      disabled () {
        return this.loading || this.noMore
      }
    },
  mounted(){
    this.getData()
  },
  methods:{
    getData(){
      axios.get('api/modules/list?modules=FAutoNewsArticleList',{})
      .then((data)=>{
        this.newsList = data.data.data.FAutoNewsArticleList
        // console.log(this.newsList);
      })
    },
    load () {
        this.loading = true
        setTimeout(() => {
          this.count += 5
          this.loading = false
        }, 2000)
      }
  }
}
</script>
<style scoped>
a{
  text-decoration: none;
}
::-webkit-scrollbar{
  width: 10px;
}
  .list-item{
    list-style: none;
    margin-top: 10px;
    margin-left:-30px
  }
  .infinite-list-wrapper{
    height: 80%;
  }
  .znews{
    background: url('https://puui.qpic.cn/vupload/0/1580094612258_hlp94jy4c6v.png/0');
  }
</style>