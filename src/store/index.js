import { createStore } from 'vuex'

const state = {
  isLoading: true
}

const mutations = {
  loadingSpinner (state) {
    state.isLoading = true
  },
  unloadingSpinner (state) {
    state.isLoading = false
  }
}

export default createStore({
  state,
  mutations,
  actions: {
  },
  getters: {
    isLoading: state => state.isLoading
  },
  modules: {
  }
})
