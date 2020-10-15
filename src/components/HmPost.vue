<template>
  <div>
    <!-- 视频 -->
    <div class="video-stop" v-if="list.type === 2">
      <div class="title">{{ list.title }}</div>
      <div class="center">
        <img :src="pathURL(list.cover[0].url)" alt="" />
        <div class="play">
          <i class="iconfont iconshipin"></i>
        </div>
      </div>
      <div class="buttom">
        <span>{{ list.user.nickname }}</span>
        <span>{{ list.comments.length }}跟帖</span>
      </div>
    </div>
    <!-- 单个图片 -->
    <div class="lingle-img-stop" v-else-if="list.cover.length < 3">
      <div class="left">
        <div class="title">后面接远程仓库的地址</div>
        <div class="buttom">
          <span>{{ list.user.nickname }}</span>
          <span>{{ list.comments.length }}跟帖</span>
        </div>
      </div>
      <div class="right">
        <img :src="pathURL(list.cover[0].url)" alt="" />
      </div>
    </div>
    <!-- 多个 -->
    <div class="multi-img-stop" v-else>
      <div class="title">后面接远程仓库的地址</div>
      <div class="imgs">
        <img :src="pathURL(list.cover[0].url)" alt="" />
        <img :src="pathURL(list.cover[1].url)" alt="" />
        <img :src="pathURL(list.cover[2].url)" alt="" />
      </div>
      <div class="buttom">
        <span>{{ list.user.nickname }}</span>
        <span>{{ list.comments.length }}跟帖</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["list"],
  methods: {
    pathURL(url) {
      if (url.startsWith("http")) {
        return url;
      } else {
        return this.$axios.defaults.baseURL + url;
      }
    },
  },
};
</script>

<style lang='less' scoped>
.title {
  font-size: 14px;
  line-height: 20px;
}
.buttom {
  padding: 10px 0;
  color: #ccc;
  span {
    margin-right: 15px;
  }
}
// 视频
.video-stop {
  padding: 10px;
  position: relative;
  .center {
    img {
      width: 350px;
      height: 170px;
      object-fit: cover;
      padding: 10px 0;
    }
    .play {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.6);
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      line-height: 60px;
      i {
        color: #fff;
        font-size: 30px;
      }
    }
  }
}

// 单个图片
.lingle-img-stop {
  padding: 10px;
  display: flex;
  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .right {
    img {
      width: 110px;
      height: 70px;
      object-fit: cover;
    }
  }
}

// 多个图片
.multi-img-stop {
  padding: 10px;
  .imgs {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    img {
      width: 110px;
      height: 70px;
      object-fit: cover;
    }
  }
}
</style>