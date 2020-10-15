<template>
  <div class="hm-header">
    <div class="fixed">
      <div class="left">
        <i @click="$router.back()" class="iconfont iconjiantou2"></i>
      </div>
      <div class="center">
        <slot></slot>
      </div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.hm-header {
  height: 30px;

  .fixed {
    position: fixed;
    width: 100%;
    height: 30px;
    z-index: 999;
    // border-bottom: 1px solid #ccc;
    background-color: #ccc;
    font-size: 20px;

    display: flex;
    text-align: center;
    align-items: center;
    .left,
    .right {
      width: 30px;
    }
    .center {
      flex: 1;
      font-weight: 700;
      // background-color: green;
    }
  }
}
</style>
