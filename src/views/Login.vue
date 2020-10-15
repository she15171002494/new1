<template>
  <div>
    <!-- 头部 -->
    <hm-header>登录</hm-header>
    <!-- logo -->
    <hm-logo></hm-logo>
    <!-- 输入框 -->
    <van-field
      v-model="username"
      required
      clearable
      label="用户名"
      placeholder="请输入用户名"
      :error-message="usernameErrMsg"
      @input="checkUsername"
    />
    <van-field
      v-model="password"
      required
      clearable
      label="密 码"
      placeholder="请输入密码"
      :error-message="passwordErrMsg"
      @input="checkPassword"
    />
    <!-- button -->
    <hm-button @click.native="startLoing">登录</hm-button>
    <!-- 链接 -->
    <div class="login-link">
      没有账号？去 <router-link to="/register">注册</router-link>
    </div>
  </div>
</template>

<script>
// 引入axios
// import axios from 'axios'

export default {
  data() {
    return {
      username: "10086", //用户名
      password: "123", //密码
      usernameErrMsg: "", //用户名效验
      passwordErrMsg: "", //密码效验
    };
  },
  created() {
    // 方法一  p - q
    // const { username, password } = this.$route.query

    // 方法二 n - p
    let { username, password } = this.$route.params;
    if (username && password) {
      (this.username = username), (this.password = password);
    }
  },
  methods: {
    // 用户名效验
    checkUsername() {
      const reg = /^1\d{3,5}$/;
      if (reg.test(this.username)) {
        this.usernameErrMsg = "";
      } else {
        this.usernameErrMsg = "用户名格式错误";
      }
      // 如果用户名为空，提示不显示
      if (!this.username) {
        this.usernameErrMsg = "";
      }
    },
    // 密码效验
    checkPassword() {
      const reg = /^\d{3,12}$/;
      if (reg.test(this.password)) {
        this.passwordErrMsg = "";
      } else {
        this.passwordErrMsg = "密码格式错误";
      }
      // 如果密码为空，提示不显示
      if (!this.password) {
        this.passwordErrMsg = "";
      }
    },
    // 点击登录
    async startLoing() {
      try {
        await this.$dialog.confirm({
          title: "提示",
          message: "登录吗？",
        });
        if (
          this.username !== "" &&
          this.password !== "" &&
          this.usernameErrMsg === "" &&
          this.passwordErrMsg === ""
        ) {
          this.$toast.success("效验成功");
          // 发送axios请求
          let res = await this.$axios.post("/login", {
            username: this.username,
            password: this.password,
          });

          // console.log(res)
          // res.data解构
          const { statusCode, message, data } = res.data;
          if (statusCode === 200) {
            // 存token + id
            localStorage.setItem("token", data.token);
            localStorage.setItem("user_id", data.user.id);
            // 提示
            this.$toast.success(message);
            // 跳转
            this.$router.push("/home");
          } else {
            // 提示
            this.$toast.fail(message);
          }
        } else {
          this.$toast.fail("效验失败");
        }
      } catch {
        this.$toast.fail("取消登录");
      }
    },
  },
};
</script>

<style lang="less" scoped>
// 链接
.login-link {
  text-align: center;
  font-size: 14px;
}
</style>
