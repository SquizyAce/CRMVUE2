import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import VueCompositionAPI from '@vue/composition-api'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'materialize-css/dist/css/materialize.min.css' // подключение материалайза js необходимые скрипты для плагинов анимаций и т.д.
import dateFilter from '@/filters/date.filter'
import messagePlugin from '@/tools/message.plugin'
import Loader from '@/components/app/Loader'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'


Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(VueCompositionAPI)
Vue.use(messagePlugin)
Vue.filter('date', dateFilter)
Vue.component('Loader', Loader)

const firebaseConfig = {
  apiKey: "AIzaSyBvlNgijPHUd_q7CFaU3_fISX5gH15WFbc",
  authDomain: "diplomv2-6.firebaseapp.com",
  databaseURL: "https://diplomv2-6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "diplomv2-6",
  storageBucket: "diplomv2-6.appspot.com",
  messagingSenderId: "801320213011",
  appId: "1:801320213011:web:5e91c3e2056a138c747de6",
  measurementId: "G-6VMKEECTS7"
}

let app

firebase.initializeApp(firebaseConfig)
firebase.auth().onAuthStateChanged(() => {
if (!app)
{
  new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
}
})


