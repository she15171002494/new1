<template>
  <div>
    <!-- 头部 -->
    <hm-header>我的收藏</hm-header>
    <!-- 列表 -->
    <hm-post v-for="item in list" :key="item.id" :list="item"></hm-post>
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
    this.getList();
  },
  methods: {
    async getList() {
      let res = await this.$axios.get("/user_star");
      this.list = res.data.data;
    },
  },
};
</script>

<style>
</style>