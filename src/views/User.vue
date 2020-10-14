<template>
  <div>
    <!-- 头部 -->
    <hm-header>个人中心</hm-header>
    <!-- 头部信息 -->
    <div class="info">
      <div class="left">
        <img :src="$axios.defaults.baseURL + info.head_img" alt="" />
      </div>
      <div class="center">
        <div class="user-nickname">
          <i v-if="info.gender === 1" class="iconfont iconxingbienan"></i>
          <i v-else class="iconfont iconxingbienv"></i>
          {{ info.nickname }}
        </div>
        <div class="user-date">{{ info.create_date | date }}</div>
      </div>
    </div>
    <!-- 列表 -->
    <div class="user-list">
      <van-cell-group>
        <van-cell
          @click="$router.push('/myfollows')"
          title="我的关注"
          is-link
          value="关注的用户"
        />
        <van-cell
          @click="$router.push('/mycomments')"
          title="我的跟帖"
          is-link
          value="跟帖/回复"
        />
        <van-cell title="我的收藏" is-link value="文档/视频" />
        <van-cell @click="$router.push('/edit')" title="设置" is-link />
        <van-cell @click="logout" title="退出" is-link />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: "",
    };
  },
  created() {
    let token = localStorage.getItem("token");
    let user_id = localStorage.getItem("user_id");
    this.$axios
      .get(
        `/user/${user_id}`
        // {
        //   headers: {
        //     Authorization: token,
        //   },
        // }
      )
      .then((res) => {
        let { statusCode, message, data } = res.data;
        if (statusCode === 200) {
          this.info = data;
        }
      });
  },
  methods: {
    // 退出
    logout() {
      this.$dialog
        .confirm({
          title: "温馨提示",
          message: "您真的确认要退出吗？",
        })
        .then(() => {
          // 删除 token + id
          localStorage.removeItem("token");
          localStorage.removeItem("user_id");
          // 提示
          this.$toast.success("退出成功");
          // 跳转
          this.$router.push("/login");
        })
        .catch(() => {
          console.log("取消啦");
        });
    },
  },
};
</script>

<style lang="less" scoped>
// 头部信息
.info {
  height: 100px;
  display: flex;
  align-items: center;
  margin: 0 20px;
  .left {
    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  .center {
    flex: 1;
    margin-left: 20px;
    height: 50px;
    line-height: 25px;
  }
}
</style>
