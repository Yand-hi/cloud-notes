<template>
  <div id="notebook-list">
    <header>
      <a href="#" class="btn" @click="onCreate">
        <i class="iconfont icon-plus"></i>
        新建笔记本
      </a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表(x)</h3>
        <div class="book-list">
          <a href="#" class="notebook">
            <span class="iconfont icon-notebook"></span>
            笔记本标题1
            <span>1</span>
            <span class="action" @click="onEdit">编辑</span>
            <span class="action" @click="onDelete">删除</span>
            <span class="date">一天前</span>
          </a>
          <a href="#" class="notebook">
            <span class="iconfont icon-notebook"></span>
            笔记本标题2
            <span>1</span>
            <span class="action">编辑</span>
            <span class="action">删除</span>
            <span class="date">两天前</span>
          </a>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Auth from '../apis/auth'
import Notebooks from '../apis/notebooks'

window.Notebooks = Notebooks

export default {
  data() {
    return {
      msg: '笔记本列表'
    }
  },
  created() {
    Auth.getInfo()
      .then(data => {
        if (!data.isLogin) {
          this.$router.push({path: 'login'})
        }
      })
  },
  methods: {
    onCreate() {
      console.log('onCreate...')
    },
    onEdit() {
      console.log('onEdit...')
    },
    onDelete() {
      console.log('onDelete...')
    },
  }
}
</script>

<style lang="less" scoped>
@import url(../assets/style/notebooklist);
</style>
