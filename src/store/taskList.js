/* eslint-disable */
import firebase from 'firebase/app'
import getUUID from '@/../scripts/UUID.js'

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
    },
    deleteTaskList (state, list) {
      const taskListIdx = state.taskList.indexOf(list)
      state.taskList.splice(taskListIdx, 1)
    }
  },
  mixins: [getUUID],
  actions: {
    async addTodoListAsync({ dispatch, commit }, list ){
      try{
        const uid = await dispatch('getUid')
        const newList = {
            name: list.name,
            uuid: list.uuid,
            count: 0,
            isDone: false,
            created: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
            updated: new Date().toJSON().slice(0,10).replace(/-/g,'/')
        }
        await firebase.database().ref(`/user/${uid}/lists/${newList.uuid}`).set(newList)
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
    },
    async deleteTaskListById( {dispatch, commit}, taskList){
      try{
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/user/${uid}/lists/${taskList.uuid}`).remove()
        commit('deleteTaskList', taskList)
      } catch (e){
        throw e
      }
    }
  },
  getters: {
    getTaskList: s => s.taskList
  }
}
