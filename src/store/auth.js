/* eslint-disable */
import firebase from 'firebase/app'

export default {
  actions: {
    async login ({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        throw e
      }
    },
    async logout(){
      await firebase.auth().signOut()
    },
    async register({dispatch, commit}, { email, password, name}){
      try{
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/user/${uid}/info`).set({
          name
        })
      } catch (e) {
        throw e
      }
    },
    getUid(){
      return firebase.auth().currentUser?.uid
    }
  }
}
