<template>
  <div class="detail" id="notebook-list">
    <header>
      <el-button type="text" class="btn" @click="onCreate">
        <i class="iconfont icon-plus"></i>
        新建笔记本
      </el-button>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表 {{ notebooks.length }}</h3>
        <div class="book-list">
          <router-link :to="`/note?notebookId=${notebook.id}`" class="notebook" v-for="notebook in notebooks"
                       :key="notebook.id">
            <div>
              <span class="iconfont icon-notebook"></span>{{ notebook.title }}
              <span>{{ notebook.noteCounts }}</span>
              <span class="action" @click.stop.prevent="onDelete(notebook)">删除</span>
              <span class="action" @click.stop.prevent="onEdit(notebook)">编辑</span>
              <span class="date">{{ notebook.createdAtFriendly }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  data() {
    return {}
  },
  created() {
    this.checkLogin({path: 'login'})
    this.getNotebooks()
  },

  computed: {
    ...mapGetters(['notebooks'])
  },

  methods: {
    ...mapActions([
      'getNotebooks',
      'addNotebook',
      'updateNotebook',
      'deleteNotebook',
      'checkLogin'
    ])
    ,
    onCreate() {
      this.$prompt('请输入笔记本标题', '创建笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: '标题不能为空，且不超过30个字符'
      }).then(({value}) => {
        this.addNotebook({title: value})
      })
    },

    onEdit(notebook) {
      let title = ''
      this.$prompt('请输入笔记本新标题', '修改笔记本标题', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: notebook.title,
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: '标题不能为空，且不超过30个字符'
      }).then(({value}) => {
        title = value
        this.updateNotebook({notebookId: notebook.id, title})
      })
    },

    onDelete(notebook) {
      this.$confirm('确认删除', '是否删除当前笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteNotebook({notebookId: notebook.id})
      })
    },
  }
}
</script>

<style lang="less" scoped>
@import url(../assets/style/notebooklist);
</style>
