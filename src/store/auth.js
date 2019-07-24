import axios from "axios";
import appConfig from "../config/app";
import router from "../router";
import Vue from "vue"
import * as generalRepo from "../repository/general";
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
      
      server.post("login", payload, {}, () => {});

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
          commit("SET_ERROR", generalRepo.prepareErrorRespond(error));
          dispatch("SET_PROCESSING", false);
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
          dispatch("CLEAR_MESSAGES");
          dispatch("SET_PROCESSING", true);
          axios
              .post(appConfig.api + "register", {
                  name: payload.name,
                  email: payload.email,
                  password: payload.password,
                  phone: payload.phone,
                  city: payload.city
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
                  commit("SET_ERROR", generalRepo.prepareErrorRespond(error));
                  dispatch("SET_PROCESSING", false);
              });
      },

/* RESET_PASSWORD action */
      RESET_PASSWORD({ commit, dispatch }, payload) {
          dispatch("CLEAR_MESSAGES");
          dispatch("SET_PROCESSING", true);
          axios
              .post(appConfig.api + "password/create", { email: payload.email })
              .then(response => {
                dispatch("SET_PROCESSING", false);
                // response.status = 200
                if (response.data.success) {
                    commit("SET_SUCCESS_MESSAGE", response.data.success);
                    router.push({path:"/"});
                }
                if (response.error) {
                    throw new Error(response.error);
                }
              })
              .catch(error => {
                  commit("SET_ERROR", generalRepo.prepareErrorRespond(error));
                  dispatch("SET_PROCESSING", false);
              });
      },

/* SET_NEW_PASSWORD action */
      SET_NEW_PASSWORD({ commit, dispatch}, payload) {
          dispatch("CLEAR_MESSAGES");
          dispatch("SET_PROCESSING", true);
          axios
              .post(appConfig.api + "password/reset", { 
                token: payload.token,
                password: payload.password,
                password_confirmation: payload.password_confirm 
              })
              .then(response => {
                dispatch("SET_PROCESSING", false);
                // response.status = 200
                if (response.data.success) {
                    commit("SET_SUCCESS_MESSAGE", response.data.success);
                    // todo processing auth respond
                    router.push({path:"/login"});
                }
                if (response.error) {
                    throw new Error(response.error);
                }
                if (response.message) {
                    throw new Error(response.message);
                }
              })
              .catch(error => {
                  commit("SET_ERROR", generalRepo.prepareErrorRespond(error));
                  dispatch("SET_PROCESSING", false);
              });
      },

  },
  getters: {
    getUser: state => state.user,
    isAuth: state =>  !!state.token
  }
};
