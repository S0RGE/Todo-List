/* eslint-disable */
import firebase from 'firebase/app'

export default {
  state: {
    taskList: []
  },
  mutations: {
    setTaskLists (state, taskList){
      state.taskList = taskList
    },
    addToTaskList (state, list) {
      state.taskList.push(list)
    }
  },
  actions: {
    async addTodoList({ dispatch, commit }, list ){
      try{
        const uid = await dispatch('getUid')
        const newList = {
            name: list,
            count: 0,
            isDone: false,
            created: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
            updated: new Date().toJSON().slice(0,10).replace(/-/g,'/')
        }
        await firebase.database().ref(`/user/${uid}/lists/${list}`).set(newList)
        commit('addToTaskList', newList)
      } catch (e){
        throw e
      }
      
    },
    async getTaskListByUser({ dispatch, commit }){
      try{
        const uid = await dispatch('getUid')
        const taskList = (await firebase.database().ref(`/user/${uid}/lists`).once('value')).val() || []
        commit('setTaskLists', Object.values(taskList))
      } catch (e){
        throw e
      }
    }
  },
  getters: {
    getTaskList: s => s.taskList
  }
}
