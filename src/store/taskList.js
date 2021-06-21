/* eslint-disable */
import firebase from 'firebase/app'

export default {
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
    }
  }
}
