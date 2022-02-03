import Note from '@/apis/notes'
import {Message} from 'element-ui'

const state = {
  notes: null,
  currentNoteId: null
}

const getters = {
  notes: state => state.notes || [],
  currentNote: state => {
    if (!Array.isArray(state.notes)) return {title: '', content: ''}
    if (!state.currentNoteId) return state.notes[0] || {title: '', content: ''}
    return state.notes.find(note => note.id === state.currentNoteId - 0) || {title: '', content: ''}
  }
}

const mutations = {
  setNote(state, {notes}) {
    state.notes = notes
  },
  addNote(state, {note}) {
    state.notes.unshift(note)
  },
  updateNote(state, {noteId, title, content}) {
    let note = state.notes.find(note => note.id === noteId) || {}
    note.title = title
    note.content = content
  },
  deleteNote(state, {noteId}) {
    state.notes = state.notes.filter(note => note.id !== noteId)
  },
  setCurrentNote(state, payload = {}) {
    state.currentNoteId = payload.currentNoteId
  }
}

const actions = {
  getNotes({commit}, {notebookId}) {
    return Note.getAll({notebookId})
      .then(res => {
        commit('setNote', {notes: res.data})
      })
  },

  addNote({commit}, {notebookId, title, content}) {
    return Note.addNote({notebookId}, {title, content})
      .then(res => {
        commit('addNote', {note: res.data})
      })
  },

  updateNote({commit}, {noteId, title, content}) {
    return Note.updateNote({noteId}, {title, content})
      .then(res => {
        commit('updateNote', {noteId, title, content})
      })
  },

  deleteNote({commit}, {noteId}) {
    return Note.deleteNote({noteId})
      .then(res => {
        commit('deleteNote', {noteId})
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
