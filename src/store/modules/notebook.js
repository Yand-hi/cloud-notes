import Notebooks from '@/apis/notebooks'
import {Message} from 'element-ui'

const state = {
  notebooks: null,
  currentBookId: null
}

const getters = {
  notebooks: state => state.notebooks || [],
  currentBook: state => {
    if (!Array.isArray(state.notebooks)) return {}
    if (!state.currentBookId) return state.notebooks[0] || {}
    return state.notebooks.find(notebook => notebook.id === state.currentBookId - 0)
  }
}

const mutations = {
  setNotebooks(state, payload) {
    state.notebooks = payload.notebooks
  },
  addNotebook(state, payload) {
    state.notebooks.unshift(payload.notebook)
  },
  updateNotebook(state, payload) {
    const notebook = state.notebooks.find(notebook => notebook.id === payload.notebookId - 0) || {}
    notebook.title = payload.title
  },
  deleteNotebook(state, payload) {
    state.notebooks.filter(notebook => notebook.id !== payload.notebookId - 0)
  },
  setCurrentBook(state, payload) {
    state.currentBookId = payload.currentBookId
  }
}

const actions = {
  getNotebooks({commit, state}) {
    if (state.notebooks !== null) return Promise.resolve()
    return Notebooks.getAll()
      .then(res => {
        commit('setNotebooks', {notebooks: res.data})
      })
  },

  addNotebook({commit}, payload) {
    return Notebooks.addNotebook({title: payload.title})
      .then(res => {
        commit('addNotebook', {notebook: res.data})
        Message.success(res.msg)
      })
  },

  updateNotebook({commit}, payload) {
    return Notebooks.updateNotebook(payload.notebookId, {title: payload.title})
      .then(res => {
        commit('updateNotebook', {notebookId: payload.notebookId, title: payload.title})
        Message.success(res.msg)
      })
  },

  deleteNotebook({commit}, payload) {
    return Notebooks.deleteNotebook(payload.notebookId)
      .then(res => {
        commit('deleteNotebook', {notebookId: payload.notebookId})
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
