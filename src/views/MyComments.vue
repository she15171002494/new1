<template>
  <div>
    <!-- 头部 -->
    <hm-header>我的跟帖</hm-header>
    <!-- 列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="onLoad"
    >
      <div class="item" v-for="item in list" :key="item.id">
        <!-- 日期 -->
        <div class="date">{{ item.create_date | date }}</div>
        <div class="praent" v-if="item.parent">
          <div class="parent-nickname">
            回复：{{ item.parent.user.nickname }}
          </div>
          <div class="parent-content">{{ item.parent.content }}</div>
        </div>
        <!-- 内容 -->
        <div class="content">{{ item.content }}</div>
        <!-- 文章 -->
        <div class="post">
          <div class="post-title">
            {{ item.post.title }}
          </div>
          <i class="iconfont iconjiantou1"></i>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      pageIndex: 1,
    };
  },
  created() {
    // 获取数据
    this.getList();
  },
  methods: {
    // 获取数据
    async getList() {
      let res = await this.$axios.get("/user_comments", {
        params: {
          pageIndex: this.pageIndex,
          pageSize: 5,
        },
      });
      let { statusCode, message } = res.data;
      if (statusCode === 200) {
        this.loading = false;
        if (res.data.data < 5) {
          this.finished = true;
        }
        this.list = [...this.list, ...res.data.data];
      }
    },
    // 分页
    onLoad() {
      this.pageIndex++;
      this.getList();
    },
  },
};
</script>

<style lang="less" scoped>
.item {
  margin: 10px;
  border-bottom: 1px solid #000;
  .date {
    height: 20px;
    color: #ccc;
    line-height: 20px;
  }
  .praent {
    padding: 10px;
    background-color: #ddd;
    color: #999;
    .parent-nickname {
      height: 20px;
      line-height: 20px;
    }
    .parent-content {
      height: 25px;
      font-size: 14px;
      line-height: 25px;
    }
  }
  .content {
    font-size: 14px;
    padding: 10px 0;
  }
  .post {
    padding: 10px 0;
    display: flex;
    align-items: center;
    .post-title {
      flex: 1;
      color: #ccc;
    }
    i {
      width: 30px;
    }
  }
}
</style>