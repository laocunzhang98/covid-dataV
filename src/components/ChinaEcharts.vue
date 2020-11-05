<template>
  <div class="box">
    <div class="liquid">
      <el-card shadow="hover">
        <liquid-fill></liquid-fill>
      </el-card>
    </div>
    <div class="word">
      <el-card shadow="hover">
        <word-cloud></word-cloud>
      </el-card>
    </div>
    <div class="line">
      <el-card shadow="hover">
      <china-line></china-line>
    </el-card>
    </div>
  </div>
</template>

<script>
import LiquidFill from './LiquidFill'
import WordCloud from './WordCloud'
import ChinaLine from './ChinaLine'
export default {
  components:{
    LiquidFill,
    WordCloud,
    ChinaLine
  }
}
</script>

<style scoped>

.box{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.liquid{
  flex: 0 0 45%;
}
.word{
  flex: 0 0 45%;
}
.line{
  flex:0 0 100%
}
</style>
