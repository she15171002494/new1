<template>
  <div>
    <hm-floor
      :count="count - 1"
      v-if="parent.parent"
      :parent="parent.parent"
    ></hm-floor>
    <div class="hm-floor">
      <!-- 头部 -->
      <div class="header">
        <div class="left">{{ count }}楼{{ parent.user.nickname }}</div>
        <div class="center">{{ parent.create_date }}</div>
        <div class="right">回复</div>
      </div>
      <!-- 评论内容 -->
      <div class="content">{{ parent.content }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["parent", "count"],
  name: "hm-floor",
};
</script>

<style scoped lang="less">
.hm-floor {
  padding: 10px;
  border: 1px solid #000;
  border-top: none;
  &.top {
    border-top: 1px solid red;
  }
  // 头部
  .header {
    display: flex;
    .left {
      flex: 1;
    }
    .center {
      flex: 2;
    }
    .right {
      width: 60px;
    }
  }
  // 评论部分
  .content {
    padding: 10px 0;
  }
}
</style>