/* eslint-disable */
import firebase from 'firebase/app'

export default {
  actions: {
    async addTodoTask({ dispatch, commit }, task ){
      try{
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/user/${uid}/lists/${task.list}/tasks/`).set({
            name: task.title,
            isDone: false,
            created: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
            updated: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
            priority: task.priority,
            description: task.description,
            color: task.color,
            src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlUGwpR2u_hnvnP0q2r-F8UoAYsTaWDz2aSg&usqp=CAU'
        })
        // Update tasklist isDone, count, updated
        // await firebase.database().ref(`/user/${uid}/lists/${task.list}/tasks/`).set({
        // isDone: false,
        // update: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
        // count: taskList.count++
        // })
      } catch (e){
        throw e
      }
    }
  }
}
