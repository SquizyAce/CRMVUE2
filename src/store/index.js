import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import info from './modules/info'
import tenant from './modules/tenant'
import rates from './modules/rates'
import bills from './modules/bills'
import apartaments from './modules/apartaments'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  getters: {
    error: s => s.error
  },
  actions: {
  },
  modules: {
    auth, info, tenant, rates, apartaments, bills
  }
})
