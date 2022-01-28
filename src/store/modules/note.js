import Note from '@/apis/notes'
import {Message} from 'element-ui'

const state = {
  notes: [],
  currentNote: {}
}

const getters = {
  notes: state => state.notes
}

const mutations = {
  setNote(state, {notes}) {
    state.notes = notes
  },
  addNote(state, {notes}) {
    state.notes.unshift(notes)
  },
  updateNote(state, {noteId, title, content}) {
    const note = state.notes.find(note => note.id === noteId) || {}
    note.title = title
    note.content = content
  },
  deleteNote(state, {noteId}) {
    state.notes.filter(note => note.id !== noteId)
  },
}

const actions = {
  getNote({commit}, {notebookId}) {
    Note.getAll({notebookId: notebookId})
      .then(res => {
        commit('setNote', {notes: res.data})
      })
  },

  addNote({commit}, {notebookId, title, content}) {
    Note.addNote({notebookId: notebookId}, {title: title, content: content})
      .then(res => {
        commit('addNote', {note: res.data})
        Message.success(res.msg)
      })
  },

  updateNote({commit}, {noteId, title, content}) {
    Note.updateNote(noteId, {title: title, content: content})
      .then(res => {
        commit('updateNote', {noteId: noteId}, {title: title, content: content})
        Message.success(res.msg)
      })
  },

  deleteNote({commit}, {noteId}) {
    Note.deleteNote(noteId)
      .then(res => {
        commit('deleteNote', {noteId: noteId})
        Message.success(res.msg)
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
