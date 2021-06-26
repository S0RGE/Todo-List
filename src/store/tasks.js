/* eslint-disable */
import firebase from 'firebase/app'

export default {
  state: {
    tasks: []
  },
  mutations: {
    setTasks: (state, tasks) => state.tasks = tasks,
    deleteTasks: (state, task) => {
      const taskId = state.tasks.indexOf(task)
      state.tasks.splice(taskId, 1)
    },
    updateTask: (state, task) => {
      console.log('updateTask', task)
      const taskId = state.tasks.indexOf(task)
      console.log('updateTaskId', taskId)
      state.tasks.splice(taskId, 1, task)
    }
  },
  actions: {
    async addTodoTask({ dispatch, commit }, task ){
      try{
        const uid = await dispatch('getUid')
        const newTask = {
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
        await firebase.database().ref(`/user/${uid}/tasks/${task.title}`).set(newTask)
        // Update tasklist isDone, count, updated
      } catch (e){
        throw e
      }
    },
    async getTasks({ dispatch, commit }){
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
        await firebase.database().ref(`/user/${uid}/tasks/${task.title}`).remove()
        commit('deleteTasks', task)
      } catch (e){
        throw e
      }
    },
    async editTaskAsync({dispatch, commit}, task ) {
      console.log('editTaskAsync', task)
      try{
        const uid = await dispatch('getUid')
        const taskToChange = {
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
        await firebase.database().ref(`/user/${uid}/tasks/${task.lastName}`).set(taskToChange)
        commit('updateTask', task)
      } catch (e){
        throw e
      }
    }
  },
  getters : {
    getTasks: t => t.tasks 
  }
}
