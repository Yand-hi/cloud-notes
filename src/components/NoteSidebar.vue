<template>
  <div class="note-sidebar">
    <span class="btn add-note"></span>
    <el-dropdown class="notebook-title" @command="handleCommand" placement="bottom">
      <span class="el-dropdown-link">
        {{ currentBook.title }}
        <i class="iconfont icon-down"></i>
      </span>
      <button class="add-note" @click="addNote">添加笔记</button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="notebook in notebooks" :key="notebook.id" :command="notebook.id">
          {{ notebook.title }}
        </el-dropdown-item>
        <el-dropdown-item command="trash">回收站</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="menu">
      <div>更新时间</div>
      <div>标题</div>
    </div>
    <ul class="notes">
      <li v-for="note in notes" :key="note.id">
        <router-link :to=" `/note?noteId=${note.id}&notebookId=${currentBook.id}` ">
          <span class="date">{{ note.updatedAtFriendly }}</span>
          <span class="title">{{ note.title }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import Notebooks from '../apis/notebooks'
import Notes from '../apis/notes'
import Bus from '../helpers/bus'
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'

export default {
  created() {
    Notebooks.getAll()
      .then(res => {
        this.notebooks = res.data
        this.currentBook = this.notebooks.find(notebook => notebook.id + '' === this.$route.query.notebookId)
          || this.notebooks[0] || {}
        return Notes.getAll({notebookId: this.currentBook.id})
      }).then(res => {
      this.notes = res.data
      this.$emit('update:notes', this.notes)
      Bus.$emit('update:notes', this.notes)
    })
  },

  data() {
    return {
      notebooks: [],
      notes: [],
      currentBook: {}
    }
  },

  methods: {
    handleCommand(notebookId) {
      if (notebookId === 'trash') {
        return this.$router.push({path: '/trash'})
      }
      this.currentBook = this.notebooks.find(notebook => notebook.id === notebookId)
      Notes.getAll({notebookId})
        .then(res => {
          this.notes = res.data
          this.$emit('update:notes', this.notes)
        })
    },

    addNote() {
      Notes.addNote({notebookId: this.currentBook.id})
        .then(res => {
          this.notes.unshift(res.data)
        })
    }
  }
}
</script>

<style scoped lang="less">
@import url(../assets/style/note-sidebar);
</style>
