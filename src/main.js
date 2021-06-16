import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: 'AIzaSyAoV00LtpPr3CLFqBzcXchGNNTBAsVh4Mo',
  authDomain: 'todo-list-vue-nva.firebaseapp.com',
  projectId: 'todo-list-vue-nva',
  storageBucket: 'todo-list-vue-nva.appspot.com',
  messagingSenderId: '485845396628',
  appId: '1:485845396628:web:a6edff608cee4cfd7f5881',
  measurementId: 'G-6JC1P57CC9'
}

firebase.initializeApp(firebaseConfig)

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
})
