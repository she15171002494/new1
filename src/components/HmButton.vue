<template>
  <div class="hm-button">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang='less'>
.hm-button {
  height: 50px;
  background-color: red;
  border-radius: 25px;
  margin: 20px;
  text-align: center;
  line-height: 50px;
  font-size: 30px;
  font-weight: 700;
  color: #fff;
}
</style>