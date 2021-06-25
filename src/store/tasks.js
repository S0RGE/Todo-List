/* eslint-disable */
import firebase from 'firebase/app'

export default {
  state: {
    tasks: []
  },
  mutations: {
    setTasks: (state, tasks) => state.tasks = tasks
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
        console.log('addTodoTask',newTask)
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
    }
  },
  getters : {
    getTasks: t => t.tasks 
  }
}
