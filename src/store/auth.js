import axios from "axios";
import appConfig from "../config/app";
import router from "../router";

export default {
  state: {
    token: null,
    user: {}
  },
  mutations: {
    SET_AUTH_STATUS(state, payload) {
      console.log(payload);
      state.token = payload.token;
      state.user = payload.user;
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
           console.log(response);
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
        });
    }
  },
  getters: {
    getUser: state => state.user
  }
};
