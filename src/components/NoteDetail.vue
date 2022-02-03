<template>
  <div id="note" class="detail">
    <note-sidebar @update:notes="val => notes = val"></note-sidebar>
    <div class="note-detail">
      <div class="note-empty" v-show="!currentNote.id">请选择笔记</div>
      <div class="note-detail-ct" v-show="currentNote.id">
        <div class="note-bar">
          <span> 创建日期: {{ currentNote.createdAtFriendly }}</span>
          <span> 更新日期: {{ currentNote.updatedAtFriendly }}</span>
          <span>{{ statusText }}</span>
          <span class="iconfont icon-delete" @click="onDeleteNote"></span>
          <span class="iconfont icon-fullscreen" @click="isShowPreview=!isShowPreview"></span>
        </div>
        <div class="note-title">
          <input type="text"
                 v-model:value="currentNote.title"
                 @input="onUpdateNote"
                 @keydown="statusText='正在输入...'"
                 placeholder="输入标题">
        </div>
        <div class="editor">
          <codemirror v-model="currentNote.content" :options="cmOptions" v-show="!isShowPreview" @input="onUpdateNote"
                      @inputRead="statusText='正在输入...'"></codemirror>
          <div class="preview markdown-body" v-html="previewContent" v-show="isShowPreview">
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
import {codemirror} from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/markdown/markdown.js'
import 'codemirror/theme/neat.css'


let md = new MarkdownIt

export default {
  components: {NoteSidebar, codemirror},
  data() {
    return {
      statusText: '未改动',
      isShowPreview: false,
      cmOptions: {
        tabSize: 4,
        mode: 'text/x-markdown',
        theme: 'neat',
        lineNumbers: false,
        line: true,
      }
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
    }, 500),

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
      'currentBook'
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
