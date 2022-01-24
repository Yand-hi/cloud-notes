<template>
  <div class="detail" id="notebook-list">
    <header>
      <a href="#" class="btn" @click="onCreate">
        <i class="iconfont icon-plus"></i>
        新建笔记本
      </a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表 {{ notebooks.length }}</h3>
        <div class="book-list">
          <router-link to="/note/1" class="notebook" v-for="notebook in notebooks" :key="notebook.id">
            <div>
              <span class="iconfont icon-notebook"></span>{{ notebook.title }}
              <span>{{ notebook.noteCounts }}</span>
              <span class="action" @click.stop.prevent="onDelete(notebook)">删除</span>
              <span class="action" @click.stop.prevent="onEdit(notebook)">编辑</span>
              <span class="date">{{ notebook.createdAt }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Auth from '../apis/auth'
import Notebooks from '../apis/notebooks'
import {friendlyDate} from '../helpers/util'

export default {
  data() {
    return {
      notebooks: []
    }
  },
  created() {
    Auth.getInfo()
      .then(data => {
        if (!data.isLogin) {
          this.$router.push({path: 'login'})
        }
      })
    Notebooks.getAll()
      .then(res => {
        this.notebooks = res.data
      })
  },
  methods: {
    onCreate() {
      let title = window.prompt('创建笔记本')
      if (['', undefined, null].indexOf(title) >= 0) {
        alert('笔记本名称不能为空')
        return
      }
      Notebooks.addNotebook({title})
        .then(res => {
          console.log(res)
          res.data.createdAt = friendlyDate(res.data.createdAt)
          this.notebooks.unshift(res.data)
          alert('创建成功')
        })
    },

    onEdit(notebook) {
      let title = window.prompt('修改标题', notebook.title)
      Notebooks.updateNotebook(notebook.id, {title})
        .then(res => {
          notebook.title = title
          alert(res.msg)
        })
    },
    onDelete(notebook) {
      let isConfirm = window.confirm(`确定要删除《${notebook.title}》吗?`)
      if (isConfirm) {
        Notebooks.deleteNotebook(notebook.id)
          .then(res => {
            this.notebooks.splice(this.notebooks.indexOf(notebook), 1)
            alert(res.msg)
          })
      }
    },
  }
}
</script>

<style lang="less" scoped>
@import url(../assets/style/notebooklist);
</style>
