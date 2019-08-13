import router from "../router";
import Vue from "vue"
import server from "../repository/server";

const roles = ['guest', 'user', 'moderator', 'admin']

export default {
  state: {
    token: null,
    user: {},
    role: 'guest' // guest, user, moderator, admin
  },
  mutations: {
    SET_AUTH_STATUS(state, payload) {
      state.token = payload.token;
      state.user = {};
      if (payload.user.name) state.user.name = payload.user.name;
      if (payload.user.city) state.user.city = payload.user.city;
      Vue.$storage.set('auth', {
        token: state.token,
        user: state.user
      })
    },


    SET_ROLE(state, payload) {
      state.role = roles.indexOf(payload) == -1 ? 'guest' : payload
    }

  },

  actions: {

/* LOGIN action */
//  { commit, dispatch, getters, rootGetters, state } (state has only self data, getters are global)
    LOGIN({ commit, dispatch, getters}, payload) {
      server.post("login", {
          email: payload.email,
          password: payload.password
        }, {}, (response) => {
          if (response.data.success) {
            commit("SET_AUTH_STATUS", response.data.success);
            console.log(response.data.success)
            if (response.data.success.user.role) {
              commit("SET_ROLE", response.data.success.user.role)
            }
            router.push({path:"/"});
          }
        });
    },

/* AUTH_LOGOUT action */
    AUTH_LOGOUT({ commit }) {
      commit("SET_AUTH_STATUS", { token: null, user: {}})
      commit("SET_ROLE", 'guest')
      router.push({path:"/"})
    },

/* AUTH_RESTORE action */
    AUTH_RESTORE({ commit, dispatch }) {
      if (Vue.$storage.has('auth')) {
        let auth = Vue.$storage.get('auth')
        commit("SET_AUTH_STATUS", auth);
        if (auth.token) {
          dispatch("GET_ROLE", auth.token)
        }
      }
    },

/* REGISTER action */
    REGISTER({ commit, dispatch }, payload) {
      server.post("register", {
          name: payload.name,
          email: payload.email,
          password: payload.password,
          phone: payload.phone,
          city: payload.city
        }, {}, (response) => {
          if (response.data.success) {
            commit("SET_AUTH_STATUS", response.data.success);
            commit("SET_ROLE", 'user')
            router.push({path:"/"});
          }
        });
      },

/* RESET_PASSWORD action */
      RESET_PASSWORD({ commit, dispatch }, payload) {
        server.post("password/create", { email: payload.email }, {}, (response) => {
          if (response.data.success) {
            commit("SET_SUCCESS_MESSAGE", response.data.success);
            router.push({path:"/"});
          }
        });
      },

/* SET_NEW_PASSWORD action */
      SET_NEW_PASSWORD({ commit, dispatch}, payload) {
        server.post("password/reset", { 
                token: payload.token,
                password: payload.password,
                password_confirmation: payload.password_confirm 
        }, {}, (response) => {
          if (response.data.success) {
            dispatch("SET_SUCCESS_MESSAGE", response.data.success);
            router.push({path:"/"});
          }
        });
      },

/* GET_ROLE action */
      GET_ROLE({ commit, getters}) {
        try {
          server.simple_get("role", response => {
            commit('SET_ROLE', response.data.success)
          })
        } catch(error) {
          commit('SET_ROLE', 'guest')
        }
      }

  },
  getters: {
    getUser: state => state.user,
    getToken: state => state.token,
    isAuth: state =>  !!state.token,
    getRole: state => state.role
  }
};
