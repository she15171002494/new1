<template>
  <div>
    <!-- 头部 -->
    <hm-header>我的关注</hm-header>
    <!-- 列表 -->
    <div class="list">
      <div class="item" v-for="item in list" :key="item.id">
        <div class="left">
          <img :src="$axios.defaults.baseURL + item.head_img" alt="" />
        </div>
        <div class="center">
          <div class="nickname">{{ item.nickname }}</div>
          <div class="date">{{ item.create_date | date }}</div>
        </div>
        <div @click="follows(item.id)" class="right">取消关注</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
    };
  },
  created() {
    // 获取数据
    // this.getList();
    // 模拟添加数据
    this.unfollows();
  },
  methods: {
    // 获取数据
    async getList() {
      let res = await this.$axios.get("/user_follows");
      this.list = res.data.data;
    },
    // 取消关注
    async follows(id) {
      let res = await this.$axios.get(`/user_unfollow/${id}`);
      this.getList();
    },
    // 模拟添加数据
    async unfollows() {
      let res = await this.$axios.get("/user_follows/10");
      this.getList();
    },
  },
};
</script>

<style lang="less" scoped>
.item {
  padding: 10px;
  border-bottom: 1px solid #000;
  display: flex;
  align-items: center;
  .left {
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  .center {
    margin-left: 20px;
    flex: 1;
    .nickname {
      font-size: 14px;
      height: 25px;
      line-height: 25px;
    }
    .date {
      color: #999;
    }
  }
  .right {
    height: 30px;
    padding: 0 10px;
    border-radius: 15px;
    background-color: #ccc;
    line-height: 30px;
  }
}
</style>