import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import messagePlugin from './utils/message.plugin'
import Loader from './components/app/Loader'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min.js'

import { initializeApp } from 'firebase/app'
// import { getStorage } from 'firebase/storage'
import {
  // getFirestore,
  serverTimestamp,
} from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyDf4xMOEEiAzZ1AGBiJd3qQ-CUOFisiE6E',
  authDomain: 'vue-crm-4e3bc.firebaseapp.com',
  projectId: 'vue-crm-4e3bc',
  storageBucket: 'vue-crm-4e3bc.appspot.com',
  messagingSenderId: '281909612898',
  appId: '1:281909612898:web:9e6b8f3eb38693ab3fdc3b',
  databaseURL:
    'https://vue-crm-4e3bc-default-rtdb.europe-west1.firebasedatabase.app',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// const projectStorage = getStorage(app)
// const projectFirestore = getFirestore(app)
const auth = getAuth(app)

const database = getDatabase()
const timestamp = serverTimestamp

export {
  //  projectFirestore, projectStorage,
  auth,
  timestamp,
  database,
}

let application

onAuthStateChanged(auth, () => {
  if (!application) {
    application = createApp(App)
      .use(store)
      .use(router)
      .use(messagePlugin)
      .component('Loader', Loader)
      .mount('#app')
  }
})
