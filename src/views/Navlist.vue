<template>
  <div>
    <hm-header>栏目管理</hm-header>
    <div class="container">
      <!-- 点击删除  -->
      <div class="title">点击删除一个频道</div>
      <div class="list">
        <div class="item" v-for="tab in dellist" :key="tab.id">
          <div @click="del(tab.id)">{{ tab.name }}</div>
        </div>
      </div>

      <!-- 点击添加 -->
      <div class="title">点击添加一个频道</div>
      <div class="list">
        <div class="item" v-for="tab in addlist" :key="tab.id">
          <div @click="add(tab.id)">{{ tab.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dellist: [], //删除列表
      addlist: [], //添加列表
    }
  },
  created() {
    // 获取栏目列表
    this.getNavList()
  },
  // 监听
  watch: {
    dellist(newValue) {
      localStorage.setItem('dellist', JSON.stringify(newValue))
      localStorage.setItem('addlist', JSON.stringify(this.addlist))
    },
  },
  methods: {
    // 获取栏目列表
    async getNavList() {
      let dellist = JSON.parse(localStorage.getItem('dellist'))
      let addlist = JSON.parse(localStorage.getItem('addlist'))
      if (dellist && addlist) {
        this.dellist = dellist
        this.addlist = addlist
        return
      }
      let res = await this.$axios.get(`/category`)
      console.log(res)
      this.dellist = res.data.data
    },
    // 删除栏目
    del(id) {
      // 从 dellist 中筛选出点击的一项
      let tab = this.dellist.find(v => v.id === id)
      // 添加到 addlist 中
      this.addlist.push(tab)
      // 从 delist 中删除点击的一项
      this.dellist = this.dellist.filter(v => v.id !== id)
    },
    add(id) {
      //从 addlist 中筛选出点击的一项
      let tab = this.addlist.find(v => v.id === id)
      // 添加到 dellist 中
      this.dellist.push(tab)
      // 从 addlist 中删除点击的一项
      this.addlist = this.addlist.filter(v => v.id !== id)
    },
  },
}
</script>

<style scoped lang="less">
.container {
  padding: 20px;
  .title {
    font-size: 20px;
    line-height: 35px;
    height: 35px;
    font-weight: 700;
    margin-top: 10px;
  }
  .list {
    // background: #ddd;
    display: flex;
    flex-wrap: wrap;
    .item {
      height: 40px;
      width: 20%;
      display: flex;
      justify-content: center;
      align-items: center;
      div {
        height: 80%;
        width: 80%;
        background: #ddd;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
