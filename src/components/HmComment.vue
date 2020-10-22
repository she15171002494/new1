<template>
  <div>
    <div class="hm-comment">
      <!-- 头部 -->
      <div class="header">
        <div class="left">
          <img :src="$axios.defaults.baseURL + comment.user.head_img" alt="" />
        </div>
        <div class="center">
          <div class="nickname">{{ comment.user.nickname }}</div>
          <div class="date">{{ comment.create_date }}</div>
        </div>
        <div class="right" @click="reply">回复</div>
      </div>
      <!-- 楼层 -->
      <hm-floor
        :count="getCount(0, comment)"
        v-if="comment.parent"
        :parent="comment.parent"
      ></hm-floor>
      <!-- 评论内容 -->
      <div class="title">{{ comment.content }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["comment"],
  methods: {
    // 获取数据
    getCount(num, parent) {
      if (parent.parent) {
        return this.getCount(num + 1, parent.parent);
      } else {
        return num;
      }
    },
    // 点击回复
    reply() {
      console.log("我是回复");
      console.log(this.comment);
      this.$bus.$emit("reply", this.comment.id, this.comment.user.nickname);
    },
  },
};
</script>

<style scoped lang='less'>
.hm-comment {
  padding: 10px;
  .header {
    display: flex;
    align-items: center;
    .left {
      img {
        width: 60px;
        height: 60px;
        object-fit: cover;
        border-radius: 50%;
      }
    }
    .center {
      flex: 1;
      padding-left: 10px;
    }
    .right {
      width: 60px;
    }
  }
}
</style>