const state = {
    token: null,
    user: null,
};

const mutations = {
    logout(state) {
        state.token = null;
        state.user = null;
    },
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
    getUserNameAndSurname: function (state) {
        let result = "";
        if (state.user.surname) {
            result += state.user.surname;
        }
        if (state.user.name) {
            result += state.user.name;
        }
        return result;
    },
    getUserFio: function (state) {
        let result = "";
        if (state.user.surname) {
            result += state.user.surname;
        }
        if (state.user.name) {
            result += " " + state.user.name;
        }
        if (state.user.middle_name) {
            result += " " + state.user.middle_name;
        }
        return result;
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