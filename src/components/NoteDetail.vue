<template>
  <div id="note" class="detail">
    <note-sidebar @update:notes="val => notes = val"></note-sidebar>
    <div class="note-detail">
      <div class="note-empty" v-show="!currentNote.id">请选择笔记</div>
      <div v-show="currentNote.id">
        <div class="note-bar">
          <span> 创建日期: {{ currentNote.createdAtFriendly }}</span>
          <span> 更新日期: {{ currentNote.updatedAtFriendly }}</span>
          <span>{{ statusText }}</span>
          <span class="iconfont icon-delete"></span>
          <span class="iconfont icon-fullscreen"></span>
        </div>
        <div class="note-title">
          <input type="text"
                 v-model:value="currentNote.title"
                 @keydown="statusText='正在输入...'"
                 placeholder="输入标题">
        </div>
        <div class="editor">
          <textarea v-show="true" v-model:value="currentNote.content"
                    @input="updateNote"
                    @keydown="statusText='正在输入...'"
                    placeholder="请输入内容, 支持 markdown 语法"></textarea>
          <div class="preview markdown-body" v-html="" v-show="false"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NoteSidebar from './NoteSidebar'
import Notes from '../apis/notes'
import Bus from '../helpers/bus'
import Auth from '../apis/auth'
import _ from 'lodash'

export default {
  components: {NoteSidebar},
  data() {
    return {
      currentNote: {},
      notes: [],
      statusText: '未改动'
    }
  },

  created() {
    Auth.getInfo()
      .then(res => {
        if (!res.isLogin) {
          this.$router.push({path: 'login'})
        }
      })
    Bus.$once('update:notes', val => {
      this.currentNote = val.find(note => note.id + '' === this.$route.query.noteId) || {}
    })
  },

  beforeRouteUpdate(to, from, next) {
    this.currentNote = this.notes.find(note => note.id + '' === to.query.noteId)
    next()
  },

  methods: {
    updateNote: _.debounce(function () {
      Notes.updateNote({noteId: this.currentNote.id}, {
        title: this.currentNote.title,
        content: this.currentNote.content
      }).then(data => {
        this.statusText = '已保存'
      }).catch(err => {
        this.statusText = '保存失败'
      })
    }, 300)
  }

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
