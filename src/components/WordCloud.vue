<template>
  <div class="box">
    <ve-wordcloud :data="chartData" height="150px" width="150px"></ve-wordcloud>
    <div class="title"><h4>疫情热词</h4></div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        chartData: {
          columns: ['word', 'count'],
          rows: getRows()
        }
      }
    }
  }

  function getRows () {
    return [{
      'word': '新冠病毒',
      'count': 22199
    }, {
      'word': '火神山医院',
      'count': 10288
    }, {
      'word': '方舱医院',
      'count': 620
    }, {
      'word': '戴口罩',
      'count': 274470
    }, {
      'word': '安心宅',
      'count': 12311
    }, {
      'word': '健康码',
      'count': 1206
    }, {
      'word': '测体温',
      'count': 4885
    }, {
      'word': '交叉感染',
      'count': 32294
    }, {
      'word': '无症状感染者',
      'count': 18574
    }, {
      'word': '在线教育',
      'count': 38929
    },
    {
      'word': '钟南山',
      'count': 38929
    },
    {
      'word': '联防联控',
      'count': 218456
    },
    {
      'word': '科学防治',
      'count': 389291
    },
    {
      'word': '一级响应',
      'count': 138929
    },
    {
      'word': '对口支援',
      'count': 238929
    },
    {
      'word': '集中救治',
      'count': 32329
    },
    {
      'word': '听课不停学',
      'count': 2238929
    },
    {
      'word': '云生活',
      'count': 38929
    },
    {
      'word': '英雄之城',
      'count': 23929
    },
    ]
  }
</script>

<style scoped>
  .box{
  display: flex;
  
}
.title{
  padding: 45px 0;
  flex:0 0 20%
}
h4{
  writing-mode:vertical-rl;
  
}
</style>