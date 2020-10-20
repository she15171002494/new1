<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <div class="left">
        <i class="iconfont iconjiantou2"></i>
      </div>
      <div class="center">
        <i class="iconfont iconnew"></i>
      </div>
      <div class="right">
        <div @click="unfollow" v-if="detail.has_follow" class="follow">
          已关注
        </div>
        <div @click="follows" v-else class="follow">关注</div>
      </div>
    </div>
    <!-- 内容部分 -->
    <div class="content">
      <!-- 标题 -->
      <div class="title">{{ detail.title }}</div>
      <!-- 昵称 -->
      <div class="name">
        <span>悠悠</span>
        <span>2020-10-10</span>
      </div>
      <!-- 图片 -->
      <div v-if="detail.type === 1" v-html="detail.content"></div>
      <!-- 视频 -->
      <video v-else :src="detail.content" controls></video>
      <!-- 点赞 -->
      <div @click="like" class="zan" :class="{ active: detail.has_like }">
        <i class="iconfont icondianzan"></i>
        <span>{{ detail.like_length }}</span>
      </div>
    </div>
    <!-- 评论 -->
    <div class="comment">
      <hm-comment
        v-for="comment in commentList"
        :key="comment.id"
        :comment="comment"
      ></hm-comment>
    </div>
    <!-- 底部 -->
    <div class="footer">
      <!-- input -->
      <div class="input" v-if="!isShow">
        <div class="left">
          <input
            ref="input"
            @focus="handleFocus"
            type="text"
            placeholder="写跟帖"
          />
        </div>
        <div class="center">
          <van-icon name="chat-o" badge="9" />
        </div>
        <div class="right">
          <van-icon name="star-o" />
        </div>
      </div>
      <!-- textarea -->
      <div class="textarea" v-else>
        <div class="left">
          <textarea
            ref="textarea"
            @blur="handleBlur"
            placeholder="请输入内容"
          ></textarea>
        </div>
        <div class="right">
          <div class="send">发送</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detail: {},
      commentList: [], //评论列表数据
      isShow: false, //控制textarea是否显示
    };
  },
  created() {
    // 获取数据
    this.getDetail();
    // 获取评论列表数据
    this.getComment();
  },
  methods: {
    async getDetail() {
      let res = await this.$axios.get(`/post/${this.$route.params.id}`);
      console.log(res);
      this.detail = res.data.data;
    },
    // 取消关注
    async unfollow() {
      let res = await this.$axios.get(`/user_unfollow/${this.detail.user.id}`);
      this.$toast(res.data.message);
      this.getDetail();
    },
    // 关注
    async follows() {
      let res = await this.$axios.get(`/user_follows/${this.detail.user.id}`);
      this.$toast(res.data.message);
      this.getDetail();
    },
    // 点赞
    async like() {
      let res = await this.$axios.get(`/post_like/${this.detail.id}`);
      this.$toast(res.data.message);
      this.getDetail();
    },
    // 获取评论列表数据
    async getComment() {
      let res = await this.$axios.get(`/post_comment/${this.$route.params.id}`);
      console.log(res.data.data);
      this.commentList = res.data.data;
    },
    // 聚焦
    handleFocus() {
      //1. textarea 显示
      this.isShow = true;
      //2. textarea 聚焦  ==> textarea.focus()
      // 在vue中,我们想要拿到某个标签或者组件 ==> ref ==>vue中的DOM操作
    },
    // 失焦
    handleBlur() {
      this.isShow = false;
    },
  },
};
</script>

<style lang="less" scoped>
// 头部
.header {
  display: flex;
  align-items: center;
  padding: 10px;
  height: 30px;
  border-bottom: 1px solid #999;
  .left {
    width: 30px;
    i {
      font-size: 24px;
    }
  }
  .center {
    flex: 1;
    i {
      font-size: 60px;
    }
  }
  .right {
    width: 80px;
    text-align: center;
    .follow {
      width: 60px;
      height: 24px;
      border: 1px solid #999;
      border-radius: 12px;
      text-align: center;
      line-height: 24px;
    }
  }
}
// 内容部分
.content {
  padding: 10px;
  padding-bottom: 40px;
  // 标题
  .title {
    height: 40px;
    font-size: 14px;
    padding: 10px 0;
  }
  //昵称
  .name {
    color: #999;
    span {
      margin-right: 10px;
    }
  }
}
// 图片
/deep/ img {
  width: 100%;
}
// 视频
video {
  width: 100%;
  padding: 10px 0;
}
// 点赞
.zan {
  position: absolute;
  right: 10px;
  height: 26px;
  width: 60px;
  text-align: center;
  line-height: 26px;
  border: 1px solid #999;
  border-radius: 13px;
  i {
    margin-right: 10px;
  }
}
.zan.active {
  border: 1px solid red;
  color: red;
}
// 评论
.comment {
  border-top: 3px solid #999;
}
// 底部
.footer {
  background: #fff;
  border-top: 1px solid #ccc;
  position: fixed;
  bottom: 0;
  width: 100%;
  .input {
    height: 40px;
    display: flex;
    .left {
      flex: 1;
      // background: red;
      display: flex;
      justify-content: center;
      align-items: center;
      input {
        height: 30px;
        width: 80%;
        border: none;
        border-radius: 15px;
        background: #ddd;
        text-indent: 1em;
      }
    }
    .center,
    .right {
      width: 60px;
      font-size: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .textarea {
    height: 70px;
    display: flex;
    .left {
      flex: 1;
      // background: pink;
      display: flex;
      justify-content: center;
      align-items: center;
      textarea {
        border: none;
        width: 90%;
        height: 75%;
        border-radius: 8px;
        resize: none;
        background: #ddd;
        text-indent: 1em;
        padding-top: 5px;
      }
    }
    .right {
      width: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      .send {
        background: #f00;
        color: #fff;
        width: 40px;
        height: 30px;
        border-radius: 5px;
        line-height: 30px;
        text-align: center;
      }
    }
  }
}
</style>
