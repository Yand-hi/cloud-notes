<template>
  <div class="note-sidebar">
    <span class="btn add-note"></span>
    <el-dropdown class="notebook-title" @command="handleCommand" placement="bottom">
      <span class="el-dropdown-link">
        {{ currentBook.title }}
        <i class="iconfont icon-down"></i>
      </span>
      <button class="add-note" @click="onAddNote">添加笔记</button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="notebook in notebooks" :key="notebook.id" :command="notebook.id">
          {{ notebook.title }}
        </el-dropdown-item>
        <el-dropdown-item command="trash" class="iconfont icon-trash"> 回收站</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="menu">
      <div>创建时间</div>
      <div>标题</div>
    </div>
    <ul class="notes">
      <li v-for="note in notes" :key="note.id">
        <router-link :to=" `/note?noteId=${note.id}&notebookId=${currentBook.id}` ">
          <span class="date">{{ note.createdAtFriendly }}</span>
          <span class="title">{{ note.title }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'

export default {
  created() {
    this.getNotebooks()
      .then(() => {
        this.setCurrentBook({currentBookId: this.$route.query.notebookId})
        if (this.currentBook.id) return this.getNotes({notebookId: this.currentBook.id})
      }).then(() => {
      this.setCurrentNote({currentNoteId: this.$route.query.noteId})
      this.$router.replace({
        path: '/note',
        query: {
          noteId: this.currentNote.id,
          notebookId: this.currentBook.id
        }
      })
    })
  },

  data() {
    return {}
  },

  computed: {
    ...mapGetters([
      'notebooks',
      'notes',
      'currentBook',
      'currentNote'
    ])
  },

  methods: {
    ...mapMutations([
      'setCurrentBook',
      'setCurrentNote'
    ]),

    ...mapActions([
      'getNotebooks',
      'getNotes',
      'addNote'
    ]),

    handleCommand(notebookId) {
      if (notebookId === 'trash') {
        return this.$router.push({path: '/trash'})
      }
      this.$store.commit('setCurrentBook', {currentBookId: notebookId})
      this.getNotes({notebookId}).then(() => {
        this.setCurrentNote()
        this.$router.replace({
          path: '/note',
          query: {
            noteId: this.currentNote.id,
            notebookId: this.currentBook.id
          }
        })
      })
    },

    onAddNote() {
      this.addNote({notebookId: this.currentBook.id})
    }
  }
}
</script>

<style scoped lang="less">
@import url(../assets/style/note-sidebar);
</style>
