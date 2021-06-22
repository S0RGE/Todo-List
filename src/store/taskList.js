/* eslint-disable */
import firebase from 'firebase/app'

export default {
  state: {
    taskList: []
  },
  mutations: {
    setTaskLists(state, taskList){
      state.taskList = taskList
    }
  },
  actions: {
    async addTodoList({ dispatch, commit }, list ){
      try{
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/user/${uid}/lists/${list}`).set({
            name: list,
            count: 0,
            userId: uid,
            isDone: false,
            created: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
            updated: new Date().toJSON().slice(0,10).replace(/-/g,'/')
        })
      } catch (e){
        throw e
      }
    },
    async getTaskListByUser({ dispatch, commit }){
      try{
        const uid = await dispatch('getUid')
        const taskList = (await firebase.database().ref(`/user/${uid}/lists`).once('value')).val()
        console.log('getTaskListByUser', taskList)
        commit('setTaskLists', taskList)
      } catch (e){
        throw e
      }
    }
  },
  getters: {
    getTaskList: s => Object.keys(s.taskList)
  }
}
