<template>
  <div id="note" class="detail">
    <note-sidebar @update:notes="val => notes = val"></note-sidebar>
    <div class="note-detail">
      <div class="note-bar">
        <span> 创建日期: {{ currentNote.createdAtFriendly }}</span>
        <span> 更新日期: {{ currentNote.updatedAtFriendly }}</span>
        <span>{{ currentNote.statusText }}</span>
        <span class="iconfont icon-delete"></span>
        <span class="iconfont icon-fullscreen"></span>
      </div>
      <div class="note-title">
        <input type="text" v-model:value="currentNote.title" placeholder="输入标题">
      </div>
      <div class="editor">
        <textarea v-show="true" v-model:value="currentNote.content" placeholder="输入内容, 支持 markdown 语法"></textarea>
        <div class="preview markdown-body" v-html="" v-show="false">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from '../apis/auth'
import NoteSidebar from './NoteSidebar'

export default {
  components: {NoteSidebar},
  data() {
    return {
      currentNote: {},
      notes: []
    }
  },

  created() {
    Auth.getInfo()
      .then(res => {
        if (!res.isLogin) {
          this.$router.push({path: 'login'})
        }
      })
  },

  beforeRouteUpdate(to, from, next) {
    this.currentNote = this.notes.find(note => note.id + '' === to.query.noteId)
    next()
  },

}
</script>

<style scoped lang="less">
@import url(../assets/style/note-detail);

#note {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1
}
</style>
