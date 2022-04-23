import { onValue, ref } from 'firebase/database'
import { database } from '../main'

export default {
  state: {
    info: {},
  },
  mutations: {
    setInfo(state, info) {
      state.info = info
    },
    clearInfo(state) {
      state.info = {}
    },
  },
  actions: {
    async fetchInfo({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid')
        const userRef = ref(database, `/users/${uid}/info`)
        let info
        onValue(userRef, (snapshot) => {
          info = snapshot.val()
          commit('setInfo', info)
        })
      } catch (error) {
        console.log(error)
      }
    },
  },
  getters: {
    info: (s) => s.info,
  },
}
