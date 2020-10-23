<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <div class="left">
        <i @click="$router.back()" class="iconfont iconjiantou2"></i>
      </div>
      <div class="center">
        <i class="iconfont iconsearch"></i>
        <input
          @input="searChrecommend"
          @keyup.enter="search"
          v-model="keyword"
          type="text"
          placeholder="请输入搜索的内容"
        />
      </div>
      <div class="right" @click="search">搜索</div>
    </div>
    <!-- 搜索推荐 -->
    <div class="searChrecommend">
      <div v-for="item in searChrecommendList" :key="item.id">
        {{ item.title }}
      </div>
    </div>
    <!-- 列表 -->
    <div class="searchList" v-if="searchList.length > 0">
      <hm-post v-for="item in searchList" :key="item.id" :list="item">{{
        item.tiele
      }}</hm-post>
    </div>
    <!-- 内容部分 -->
    <div class="content" v-else>
      <div class="title">历史记录</div>
      <div class="list">
        <div
          @click="clickHistoryList(item)"
          class="item"
          v-for="item in historyList"
          :key="item"
        >
          {{ item }}
        </div>
      </div>
      <div class="title">热门搜索</div>
      <div class="list">
        <div
          @click="clickHistoryList(item)"
          class="item"
          v-for="item in hotSearchList"
          :key="item"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: '', //所搜关键字
      searchList: [], //搜索列表
      historyList: [], //历史搜索列表
      hotSearchList: ['关晓彤', '新闻', '123', '情火'], //热门搜索列表
      searChrecommendList: [], //搜索推荐列表
    }
  },
  created() {
    // 搜索框防抖处理
    this.searChrecommend = _.debounce(this.searChrecommend, 500)
    // 获取本地储存
    let historyList = JSON.parse(localStorage.getItem('historyList'))
    if (historyList) {
      this.historyList = historyList
    }
  },
  // 监听
  watch: {
    keyword(newValue) {
      if (!newValue) {
        this.searchList = []
        this.searChrecommendList = []
      }
    },
  },
  methods: {
    async search() {
      // 判断
      if (this.keyword.trim() === '') return
      // 存到历史所搜列表
      this.historyList.unshift(this.keyword)
      // 去重
      this.historyList = [...new Set(this.historyList)]
      // 存到本地
      localStorage.setItem('historyList', JSON.stringify(this.historyList))
      //  发送请求
      let res = await this.$axios.get('/post_search', {
        params: {
          keyword: this.keyword,
        },
      })
      console.log(res.data.data)
      this.searchList = res.data.data
    },
    // 点击历史记录
    clickHistoryList(item) {
      this.keyword = item
      this.search()
    },
    // 推荐搜索
    async searChrecommend() {
      // 判断
      if (this.keyword.trim() === '') return
      let res = await this.$axios.get('/post_search_recommend', {
        params: {
          keyword: this.keyword,
        },
      })
      console.log(res.data.data)
      this.searChrecommendList = res.data.data
    },
  },
}
</script>

<style scoped lang="less">
// 头部
.header {
  height: 30px;
  padding: 10px;
  background: #999;
  display: flex;
  align-items: center;
  .left {
    width: 30px;
    i {
      font-size: 20px;
    }
  }
  .center {
    flex: 1;
    height: 100%;
    input[type='text'] {
      height: 30px;
      width: 90%;
      border: 1px solid #ddd;
      border-radius: 15px;
      text-indent: 2em;
      margin-left: 20px;
    }
    i {
      position: absolute;
      top: 18px;
      left: 65px;
    }
  }
  .right {
    width: 50px;
    font-size: 16px;
  }
}
// 搜索推荐
.searChrecommend {
  padding: 10px;
  div {
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #ccc;
    font-size: 20px;
  }
}
// 内容部分
.content {
  padding: 10px;
  .title {
    font-size: 20px;
    font-weight: 700;
    padding-bottom: 10px;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    .item {
      background: #ddd;
      padding: 10px;
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
}
</style>
