import axios from "axios";
import appConfig from "../config/app";

export default {
  state: {
    token: null,
    user: {}
  },
  mutations: {
    SET_AUTH_STATUS(state, payload) {
      //     state.success_message = null;
    }
  },
  actions: {
    LOGIN({ commit, dispatch }, payload) {
      axios
        .post(appConfig.api + "login", {
          email: payload.email,
          password: payload.password
        })
        .then(response => {
          if (response.success) {
            commit("SET_AUTH_STATUS", response.success);
          }
          if (response.error) {
            throw new Error(response.error);
          }
        })
        .catch(error => {
          commit("SET_ERROR", error.message);
        });
    }
  },
  getters: {
    getUser: state => state.user
  }
};
