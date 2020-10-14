<template>
  <div>
    <!-- 头部 -->
    <hm-header>编辑资料</hm-header>
    <!-- 头像 -->
    <div class="edit-avatar">
      <img :src="$axios.defaults.baseURL + info.head_img" alt="" />
      <van-uploader
        class="afterRead"
        :before-read="beforeRead"
        :after-read="afterRead"
      />
    </div>
    <!-- 列表 -->
    <div class="edit-list">
      <van-cell-group>
        <van-cell
          @click="isShowNickname"
          title="昵称"
          :value="info.nickname"
          is-link
        />
        <van-cell title="密码" value="******" is-link />
        <van-cell
          @click="isShowGender"
          title="性别"
          :value="info.gender === 1 ? '男' : '女'"
          is-link
        />
      </van-cell-group>
    </div>

    <!-- 昵称修改弹框 -->
    <van-dialog
      @confirm="confirmNickname"
      v-model="showNickname"
      title="标题"
      show-cancel-button
    >
      <van-field v-model="nickname" placeholder="请输入用户名" />
    </van-dialog>

    <!-- 性别修改弹框 -->
    <van-dialog
      @confirm="confirmGender"
      v-model="showGender"
      title="标题"
      show-cancel-button
    >
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <template #right-icon>
              <van-radio :name="1" />
            </template>
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <template #right-icon>
              <van-radio :name="0" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: "",
      nickname: "", //昵称
      gender: "", //性别
      showNickname: false, //昵称修改
      showGender: false, //性别修改
    };
  },
  created() {
    // 获取数据
    this.getEdit();
  },
  methods: {
    // 获取数据
    getEdit() {
      let user_id = localStorage.getItem("user_id");
      this.$axios.get(`/user/${user_id}`).then((res) => {
        this.info = res.data.data;
      });
    },
    // 点击昵称，修改框显示
    isShowNickname() {
      // 显示
      this.showNickname = true;
      // 赋值
      this.nickname = this.info.nickname;
    },
    // 点击确认按钮，修改昵称
    confirmNickname() {
      // 判断
      if (this.nickname === this.info.nickname) {
        // 提示
        this.$toast("新旧昵称不能一样");
        return;
      }
      // 发送请求
      this.my_userEdit({ nickname: this.nickname });
    },
    // 点击性别，修改框出现
    isShowGender() {
      // 显示
      this.showGender = true;
      // 赋值
      this.gender = this.info.gender;
    },
    // 点击确定，修改性别
    confirmGender() {
      // 判断
      if (this.gender === this.info.gender) {
        // 提示
        this.$toast("无修改");
        return;
      }
      // 发送请求
      this.my_userEdit({ gender: this.gender });
    },
    // 封装一个发送修改请求的函数
    my_userEdit(data) {
      let user_id = localStorage.getItem("user_id");
      this.$axios.post(`/user_update/${user_id}`, data).then((res) => {
        this.getEdit();
        // 提示
        this.$toast.success(res.data.message);
      });
    },
    // 上传头像
    // 问价读取前的回调函数
    beforeRead(data) {
      if (data.size / 1024 > 50) {
        this.$toast.fail("文件不能大于50k");
        return false;
      }
      return true;
    },
    // 文件读取后的回调函数
    afterRead(data) {
      // 借用formdata 上传
      let formdata = new FormData();
      formdata.append("file", data.file);

      // 发送请求
      this.$axios.post("/upload", formdata).then((res) => {
        this.my_userEdit({ head_img: res.data.data.url });
      });
    },
  },
};
</script>

<style lang="less" scoped>
// 头像
.edit-avatar {
  text-align: center;
  margin: 20px 0;
  position: relative;
  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    object-fit: cover;
  }
  .afterRead {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }
}
</style>
