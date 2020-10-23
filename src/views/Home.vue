<template>
  <div>
    <!-- 头部 -->
    <div class="holder"></div>
    <div class="header">
      <div class="left">
        <i class="iconfont iconnew"></i>
      </div>
      <div class="center">
        <div @click="$router.push('/search')" class="search">
          <i class="iconfont iconsearch"></i>
          <span>搜索新闻</span>
        </div>
      </div>
      <div class="right">
        <i @click="$router.push('/user')" class="iconfont iconwode"></i>
      </div>
    </div>
    <!-- 小三角 -->
    <van-sticky z-index="999" :offset-top="60">
      <div @click="$router.push('/navlist')" class="jiantou">
        <i class="iconfont iconjiantou1"></i>
      </div>
    </van-sticky>
    <!-- tab栏 -->
    <van-tabs v-model="active" sticky :offset-top="60">
      <van-tab v-for="tab in tabsList" :key="tab.id" :title="tab.name">
        <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            :immediate-check="false"
            @load="onLoad"
          >
            <hm-post
              @click.native="$router.push(`/detail/${post.id}`)"
              v-for="(post, index) in postList"
              :key="index"
              :list="post"
            ></hm-post>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      active: 1, //tab栏索引值
      tabsList: [], //tab栏分类列表数据
      postList: [], //post文章列表数据
      loading: false, //是否在加载中
      finished: false, //数据是否已经全部加载完毕
      pageIndex: 1, //分页页码值
      pageSize: 5, //分页一次加载的文章条数
      isRefresh: false, //下拉刷新，数据是否在加载中
    }
  },
  created() {
    // 获取tab栏分类数据
    this.getTabsList()
  },
  activated() {
    // 从本地获取
    let dellist = JSON.parse(localStorage.getItem('dellist'))
    if (dellist) {
      this.tabsList = dellist
      this.active = 1
      this.getPostList(this.tabsList[this.active].id)

      return
    }
  },
  methods: {
    // 获取tab栏分类数据
    async getTabsList() {
      // 从本地获取
      let dellist = JSON.parse(localStorage.getItem('dellist'))
      if (dellist) {
        this.tabsList = dellist
        this.active = 1
        this.getPostList(this.tabsList[this.active].id)

        return
      }

      let res = await this.$axios.get('/category')
      this.tabsList = res.data.data
      console.log(this.tabsList)
      // 加载文章列表
      this.getPostList(this.tabsList[this.active].id)
    },
    // 获取post列表数据
    async getPostList(id) {
      let res = await this.$axios.get('/post', {
        params: {
          category: id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
        },
      })
      this.postList = [...this.postList, ...res.data.data]
      this.loading = false
      this.isRefresh = false
      if (res.data.data.length < 5) {
        this.finished = true
      }
    },
    // 下拉刷新
    onRefresh() {
      this.postList = []
      this.pageIndex = 1

      this.finished = false
      this.loading = true
      this.getPostList(this.tabsList[this.active].id)
    },
    // 分页加载
    onLoad() {
      this.pageIndex++
      this.getPostList(this.tabsList[this.active].id)
    },
    // 三角箭头
    fn() {
      console.log('点击了三角箭头')
    },
  },
  // 监听
  watch: {
    active(newActive) {
      // console.log(newActive);
      this.postList = []
      this.pageIndex = 1

      this.finished = false
      this.loading = true
      this.getPostList(this.tabsList[newActive].id)
    },
  },
}
</script>

<style lang="less" scoped>
// 占位
.holder {
  height: 60px;
}
// 头部
.header {
  position: fixed;
  padding: 10px;
  top: 0;
  display: flex;
  width: 100%;
  z-index: 999;
  height: 40px;
  background: red;
  height: 60px;
  align-items: center;
  color: #fff;
  box-sizing: border-box;
  .left {
    text-align: center;
    width: 60px;
    i {
      font-size: 50px;
    }
  }
  .right {
    width: 40px;
    text-align: center;
    i {
      font-size: 30px;
    }
  }
  .center {
    flex: 1;
    .search {
      height: 30px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 15px;
      text-align: center;
      line-height: 30px;
      i {
        margin-right: 15px;
      }
    }
  }
}

// tab栏
/deep/ .van-tabs__nav {
  background: pink;
  margin-right: 30px;
}

// 三角箭头
.jiantou {
  position: absolute;
  right: 0;
  width: 31px;
  height: 44px;
  background-color: pink;
  text-align: center;
  line-height: 44px;
  z-index: 999;
  i {
    font-size: 24px;
  }
}
</style>
