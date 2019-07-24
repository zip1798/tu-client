import router from "../router";
import Vue from "vue"
import server from "../repository/server";

export default {
  state: {
    token: null,
    user: {}
  },
  mutations: {
    SET_AUTH_STATUS(state, payload) {
      state.token = payload.token;
      state.user = {};
      if (payload.user.name) state.user.name = payload.user.name;
      if (payload.user.city) state.user.city = payload.user.city;
      Vue.$storage.set('auth', state)
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
            router.push({path:"/"});
          }
        });
    },

/* AUTH_LOGOUT action */
    AUTH_LOGOUT({ commit }) {
      commit("SET_AUTH_STATUS", { token: null, user: {}});
      router.push({path:"/"});
    },

/* AUTH_RESTORE action */
    AUTH_RESTORE({ commit }) {
      if (Vue.$storage.has('auth')) {
        commit("SET_AUTH_STATUS", Vue.$storage.get('auth'));
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
            commit("SET_SUCCESS_MESSAGE", response.data.success);
            router.push({path:"/"});
          }
        });
      },

  },
  getters: {
    getUser: state => state.user,
    getToken: state => state.token,
    isAuth: state =>  !!state.token
  }
};
