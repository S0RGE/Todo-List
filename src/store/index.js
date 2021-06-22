import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './auth'
import TaskList from './taskList'
import Tasks from './tasks'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError (state, error) {
      state.error = error
    },
    clearError (state) {
      state.error = null
    },
    setTasks (state, tasks) {
      state.tasks = tasks
    }
  },
  getters: {
    error: s => s.error
  },
  modules: {
    Auth,
    TaskList,
    Tasks
  }
})
