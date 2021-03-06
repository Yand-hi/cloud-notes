<template>
  <div id="note" class="detail">
    <note-sidebar @update:notes="val => notes = val"></note-sidebar>
    <div class="note-detail">
      <div class="note-empty" v-show="!currentBook.id">请创建笔记本后</div>
      <div class="note-empty" v-show="!currentNote.id">选择或创建笔记</div>
      <div class="note-detail-ct" v-show="currentNote.id">
        <div class="note-bar">
          <span> 创建日期: {{ currentNote.createdAtFriendly }}</span>
          <span> 更新日期: {{ currentNote.updatedAtFriendly }}</span>
          <span>{{ statusText }}</span>
          <span class="iconfont icon-delete" @click="onDeleteNote" title="放入回收站"></span>
          <span class="iconfont icon-preview" @click="isShowPreview=!isShowPreview" title="点击预览"></span>
        </div>
        <div class="note-title">
          <input type="text"
                 v-model:value="currentNote.title"
                 @input="onUpdateNote"
                 @keydown="statusText='正在输入...'"
                 placeholder="输入标题">
        </div>
        <div class="editor">
          <textarea v-show="!isShowPreview" v-model:value="currentNote.content"
                    @input="onUpdateNote"
                    @keydown="statusText='正在输入...'"
                    placeholder="请输入内容, 支持 Markdown 语法"></textarea>
          <div class="preview markdown-body" v-html="previewContent" v-show="isShowPreview">
            {{ previewContent }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NoteSidebar from './NoteSidebar'
import MarkdownIt from 'markdown-it'
import _ from 'lodash'
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'

let md = new MarkdownIt

export default {
  components: {NoteSidebar},
  data() {
    return {
      statusText: '未改动',
      isShowPreview: false,
    }
  },

  created() {
    this.checkLogin({path: 'login'})
  },

  beforeRouteUpdate(to, from, next) {
    this.setCurrentNote({currentNoteId: to.query.noteId})
    next()
  },

  methods: {
    ...mapMutations([
      'setCurrentNote'
    ]),

    ...mapActions([
      'updateNote',
      'deleteNote',
      'checkLogin'
    ]),

    onUpdateNote: _.debounce(function () {
      this.updateNote({
        noteId: this.currentNote.id,
        title: this.currentNote.title,
        content: this.currentNote.content
      }).then(() => {
        this.statusText = '已保存'
      }).catch(err => {
        this.statusText = '保存失败'
      })
    }, 300),

    onDeleteNote() {
      this.deleteNote({noteId: this.currentNote.id})
        .then(() => {
          this.$router.replace({path: '/note'})
        })
    },
  },

  computed: {
    ...mapGetters([
      'notes',
      'currentNote',
      'currentBook',
    ]),

    previewContent() {
      return md.render(this.currentNote.content || '')
    }
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
