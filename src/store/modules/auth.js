const state = {
  token: null,
  user: null,
};

const mutations = {
  setToken(state, token) {
    state.token = token
  },
  setUser(state, user) {
    state.user = user
  }
};
const getters = {
  getToken: state => {
    return state.token
  },
  getUser: state => {
    return state.user
  },
  isAuth: state => {
    return !!state.user
  }
};

const actions = {};

export default {
  namespaced: true,
  state: state,
  mutations: mutations,
  getters: getters,
  actions: actions
}