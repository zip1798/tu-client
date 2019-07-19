import axios from "axios";
import appConfig from "../config/app";
import router from "../router";
import Vue from "vue"

export default {
  state: {
    token: null,
    user: {}
  },
  mutations: {
    SET_AUTH_STATUS(state, payload) {
      state.token = payload.token;
      state.user = payload.user;
      Vue.$storage.set('auth', payload)
    }
  },
  actions: {
    LOGIN({ commit, dispatch }, payload) {
      dispatch("CLEAR_MESSAGES");
      dispatch("SET_PROCESSING", true);
      axios
        .post(appConfig.api + "login", {
          email: payload.email,
          password: payload.password
        })
        .then(response => {
           dispatch("SET_PROCESSING", false);
           // response.status = 200
          if (response.data.success) {
            commit("SET_AUTH_STATUS", response.data.success);
            router.push({path:"/"});
          }
          if (response.error) {
            throw new Error(response.error);
          }
        })
        .catch(error => {
          commit("SET_ERROR", error.message);
          dispatch("SET_PROCESSING", false);
        });
    },

    AUTH_LOGOUT({ commit }) {
      commit("SET_AUTH_STATUS", { token: null, user: {}});
      router.push({path:"/"});
    },

    AUTH_RESTORE({ commit }) {
      if (Vue.$storage.has('auth')) {
        commit("SET_AUTH_STATUS", Vue.$storage.get('auth'));
      }
    }
  },
  getters: {
    getUser: state => state.user,
    isAuth: state =>  !!state.token
  }
};
