/* eslint-disable */
import firebase from 'firebase/app'

export default {
  state: {
    tasks: []
  },
  mutations: {
    addTask: (state, task) => {
      state.tasks.push(task)
    },
    deleteTasksByUuid: (state, uuid) => {
      state.tasks = state.tasks.filter(task => task.list !== uuid)
    },
    setTasks: (state, tasks) => state.tasks = tasks,
    deleteTasks: (state, task) => {
      const taskId = state.tasks.indexOf(task)
      state.tasks.splice(taskId, 1)
    },
    editTask: (state, task) => {
      const taskId = state.tasks.indexOf(state.tasks.find(t=> t.uuid === task.uuid)) // TODO: less expensive method?
      state.tasks.splice(taskId, 1, task)
    }
  },
  actions: {
    async addTodoTask({ dispatch, commit }, task ){
      try{
        const uid = await dispatch('getUid')
        const newTask = {
            uuid: task.uuid,
            list: task.list,
            title: task.title,
            isDone: false,
            created: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
            updated: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
            priority: task.priority,
            description: task.description,
            color: task.color,
            src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlUGwpR2u_hnvnP0q2r-F8UoAYsTaWDz2aSg&usqp=CAU'
        }
        await firebase.database().ref(`/user/${uid}/tasks/${newTask.uuid}`).set(newTask)
        commit('addTask', newTask)
      } catch (e){
        throw e
      }
    },
    async getTasksAsync({ dispatch, commit }){
      try{
        const uid = await dispatch('getUid')
        const tasks = (await firebase.database().ref(`/user/${uid}/tasks`).once('value')).val() || []
        commit('setTasks', Object.values(tasks))
      } catch (e){
        throw e
      }
    },
    async deleteTaskAsync({dispatch, commit}, task) {
      try{
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/user/${uid}/tasks/${task.uuid}`).remove()
        commit('deleteTasks', task)
      } catch (e){
        throw e
      }
    },
    async editTaskAsync({dispatch, commit}, task ) {
      try{
        const uid = await dispatch('getUid')
        const taskToChange = {
            uuid: task.uuid,
            list: task.list,
            title: task.title,
            isDone: task.isDone,
            created: task.created || new Date().toJSON().slice(0,10).replace(/-/g,'/'),
            updated: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
            priority: task.priority,
            description: task.description,
            color: task.color,
            src: task.src
        }
        await firebase.database().ref(`/user/${uid}/tasks/${taskToChange.uuid}`).set(taskToChange)
        commit('editTask', task)
      } catch (e){
        throw e
      }
    },
    async deleteTaskByListAsync({dispatch, commit}, uuid){
      try{
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/user/${uid}/tasks/${uuid}`).remove()
        commit('deleteTasksByUuid', uuid)
      } catch (e){
        throw e
      }
    }
  },
  getters : {
    getTasks: state => state.tasks
  }
}
