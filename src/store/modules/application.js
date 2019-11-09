const state = {
  viewPort: null
}

// getters
const getters = {}

// actions
const actions = {}

// mutations
const mutations = {
  viewPort (state, value) {
    state.viewPort = value
  }
}

export default {
  namespaced: true,
  namespace: 'application',
  state,
  getters,
  actions,
  mutations
}
