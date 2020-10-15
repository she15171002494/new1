<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <div class="left">
        <i class="iconfont iconnew"></i>
      </div>
      <div class="center">
        <div class="search">
          <i class="iconfont iconsearch"></i>
          <span>搜索新闻</span>
        </div>
      </div>
      <div class="right">
        <i @click="$router.push('/user')" class="iconfont iconwode"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='less' scoped>
.header {
  padding: 10px;
  height: 40px;
  background: red;
  display: flex;
  align-items: center;
  color: #fff;
  .left {
    width: 60px;
    i {
      font-size: 50px;
    }
  }
  .center {
    flex: 1;
    .search {
      height: 30px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 15px;
      text-align: center;
      line-height: 30px;
      i {
        margin-right: 15px;
      }
    }
  }
  .right {
    width: 50px;
    text-align: center;
    i {
      font-size: 30px;
    }
  }
}
</style>