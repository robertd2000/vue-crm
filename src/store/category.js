import { ref, push } from 'firebase/database'
import { database } from '../main'

export default {
  actions: {
    async createCategory({ commit, dispatch }, { title, limit }) {
      try {
        const uid = await dispatch('getUid')
        const userRef = ref(database, `/users/${uid}/categories`)
        const category = await push(userRef, {
          title,
          limit,
        })
        return {
          title,
          limit,
          id: category.key,
        }
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
  },
}
