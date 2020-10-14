<template>
  <div>
    <!-- 头部 -->
    <hm-header>注册</hm-header>
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
      v-model="nickname"
      required
      clearable
      label="昵 称"
      placeholder="请输入昵称"
      :error-message="nicknameErrMsg"
      @input="checkNickname"
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
    <hm-button @click.native="startRegister">注册</hm-button>
    <!-- 链接 -->
    <div class="login-link">
      已有账号？去 <router-link to="/login">登录</router-link>
    </div>
  </div>
</template>

<script>
// 引入axios
// import axios from 'axios'

export default {
  data() {
    return {
      username: "", //用户名
      nickname: "", //昵称
      password: "", //密码
      usernameErrMsg: "", //用户名效验
      nicknameErrMsg: "", //昵称效验
      passwordErrMsg: "", //密码效验
    };
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
    // 昵称效验
    checkNickname() {
      const reg = /^[\u4e00-\u9fa5]{3,7}$/;
      if (reg.test(this.nickname)) {
        this.nicknameErrMsg = "";
      } else {
        this.nicknameErrMsg = "昵称格式错误";
      }
      // 如果昵称为空，提示不显示
      if (!this.nickname) {
        this.nicknameErrMsg = "";
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
      // 如果密码为空
      if (!this.password) {
        this.passwordErrMsg = "";
      }
    },
    // 点击注册
    async startRegister() {
      if (
        this.username !== "" &&
        this.nickname !== "" &&
        this.password !== "" &&
        this.usernameErrMsg === "" &&
        this.nicknameErrMsg === "" &&
        this.passwordErrMsg === ""
      ) {
        this.$toast.success("效验成功");
        // 发送axios 请求
        let res = await this.$axios.post("/register", {
          username: this.username,
          nickname: this.nickname,
          password: this.password,
        });

        console.log(res);
        // res.data解构
        const { statusCode, message } = res.data;
        if (statusCode === 200) {
          // 提示
          this.$toast.success(message);
          // 跳转
          // 第一种方法
          // this.$router.push({
          //   path: '/login',
          //   query: {
          //     username: this.username,
          //     password: this.password,
          //   },
          // })

          // 第二种方法
          this.$router.push({
            name: "login",
            params: {
              username: this.username,
              password: this.password,
            },
          });
        } else {
          // 提示
          this.$toast.fail(message);
        }
      } else {
        this.$toast.success("效验失败");
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
